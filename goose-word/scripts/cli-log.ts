export const cliLog = (line: string): void => {
  process.stdout.write(`${line}\n`);
};

export const cliError = (line: string): void => {
  process.stderr.write(`${line}\n`);
};
