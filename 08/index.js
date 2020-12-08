const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
// const input = `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`;

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

function* instructionStream(program) {
  let pc = 0;
  let history = new Set();

  while (pc < program.length) {
    if (history.has(pc)) {
      throw new Error('infinite loop detected');
    }

    history.add(pc);
    const [instruction, operand] = program[pc];

    if (instruction === 'jmp') {
      pc += Number(operand);
      continue;
    }

    if (instruction !== 'nop') {
      yield [instruction, Number(operand)];
    }
    pc++;
  }

  // console.log(
  //   chalk`{bgYellow.black program terminated with PC {red ${pc} [${program.length}]}}`
  // );
}

function runProgram(program) {
  let acc = 0;
  try {
    for (let [opcode, operand] of instructionStream(program)) {
      // console.log(chalk`{yellow ${opcode.toUpperCase()}} ${operand}`);
      acc += operand;
    }

    return {success: true, result: acc};
  } catch (err) {
    return {success: false, result: acc, err};
  }
}

// part 1
const program = input.split('\n').map(s => s.split(' '));
const {result} = runProgram(program);
console.log(
  chalk`{green right before entering an infinite loop the accumulator has value {blue ${result}}}`
);

// part 2
const programVariations = [];
for (let i = 0; i < program.length; i++) {
  const [opcode, operand] = program[i];
  if (opcode === 'nop' || opcode === 'jmp') {
    const altProgram = program.slice(0);
    altProgram[i] = [opcode === 'jmp' ? 'nop' : 'jmp', operand];
    programVariations.push(altProgram);
  }
}

console.log(`generated ${programVariations.length} variations..`);

const spinner = ora().start();
for (let i = 0; i < programVariations.length; i++) {
  spinner.text = `running variation ${i + 1} of ${programVariations.length}`;

  const {success, result} = runProgram(programVariations[i]);
  if (success) {
    spinner.succeed();
    console.log(
      chalk`{green variation ${
        i + 1
      } worked out! Final status was {blue ${result}}}`
    );

    break;
  }
}
