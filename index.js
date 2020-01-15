const Jimp = require("jimp");
const path = require("path");
const open = require("open");
const yargs = require("yargs")
  .usage("Usage volmer <msg1> <msg2>")
  .alias("s", "font-size")
  .describe("s", "The font size")
  .default("s", 64)
  .choices("s", [8, 10, 12, 14, 16, 32, 64, 128])
  .alias("o", "output")
  .default("o", "volmer.jpg")
  .describe("o", "output image file")
  .default("open", true)
  .describe("open", "open the generated file")
  .help("help", "Shows this help");

const argv = yargs.argv;

if (argv._.length != 2) {
  yargs.showHelp();
  process.exit(-1);
}

const exec = async () => {
  const image = await Jimp.read(path.resolve(__dirname, "./volmer_drake.jpg"));

  const font = await Jimp.loadFont(Jimp[`FONT_SANS_${argv.s}_BLACK`]);

  image.print(font, 650, 100, argv._[0], 500);
  image.print(font, 650, 700, argv._[1], 500);

  await image.writeAsync(argv.o);

  console.info("Generated", argv.o);

  if (argv.open) {
    await open(argv.o);
  }
};

exec().catch(console.error);
