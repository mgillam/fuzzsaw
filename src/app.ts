#!/usr/bin/env node
import chalk from 'chalk';
// import clear from 'clear';
import { textSync, Options } from 'figlet';
// import path from 'path';
import program from 'commander';
import { promises as fs } from 'fs';
/* import * as Sqrl from 'squirrelly';
import { SqrlConfig } from 'squirrelly/dist/types/config'; */
import * as TOML from '@iarna/toml';
import { SequentialFuzzingStrategy } from './fuzzing/strategies/SequentialStrategy';
import { FuzzingStrategy } from './fuzzing/strategies/FuzzingStrategy';

let bannerOptions : Options = {};
bannerOptions.horizontalLayout = 'full';

// clear();
console.log(
    chalk.red(
        textSync('fuzzSaw', bannerOptions)
    )
);

const registeredStrategies : Array<FuzzingStrategy> = [new SequentialFuzzingStrategy];

program
  .version('1.0.0')
  .description("A websocket fuzzing engine")
  .option('-c, --config <path>', 'Specify attack config')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
  const args = program.opts();
  fs.open(args.config, 'r').then((fileHandle) => {
    return fileHandle.readFile();
  }).then((bufferedFile) => {
    const fuzzConfig: any = TOML.parse(bufferedFile.toString("utf8"));
    let fuzzType = fuzzConfig.fuzz_type;
    let strategy : FuzzingStrategy | undefined = registeredStrategies.filter(strat => strat.aliases.indexOf(fuzzType.toLowerCase()))[0];

    if(!strategy) {
      throw Error(chalk.redBright(`No registered strategy found for fuzz_type '${fuzzType}'`));
    } else {
      console.log(chalk.cyanBright(`fuzz_type '${fuzzType}' resolved to ${strategy.aliases[0]} strategy`));
    }

    let errors = strategy.validate(fuzzConfig);
    if(errors.length) {
      throw Error(chalk.redBright(`Config errors found:
        ${errors.map((error, n) => `${n + 1}. ${error}`).join('\n\t')}
      `));
    }

    return strategy.execute(fuzzConfig);
 
  }).then((msg) => {
    console.log(msg);
  }).catch((reason) => {
    console.error(chalk.redBright(reason));
  })
}

