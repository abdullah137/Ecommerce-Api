import chalk from "chalk";
import dayjs from "dayjs";

const getTimeStamap = (): string => {
	return dayjs().format("dddd, M YYYY").toString();
};

export default class logging {
	public static log = (args: any) => console.log(args);
	public static info = (args: any) => console.log(chalk.blue(`[${getTimeStamap()}] [LOG]`), typeof args === "string" ? chalk.blueBright(args):args);
	public static debug = (args: any) => console.log(chalk.white(`[${getTimeStamap()}] [INFO]`), typeof args === "string" ? chalk.whiteBright(args):args);
	public static error = (args: any) => console.log(chalk.red(`[${getTimeStamap()}] [ERROR]`), typeof args === "string" ? chalk.redBright(args):args); 
}