import chalk from "chalk";
import dayjs from "dayjs";

export default class Logging
{
	public static log = ( args:any ) => this.info(args);
	public static info = ( args: any ) => console.log( chalk.blue( `[${dayjs().locale('pt-br').format()}] [INFO]` ), typeof args === 'string' ? chalk.blueBright( args ) : args );
	public static warning = ( args: any ) => console.log( chalk.blue( `[${dayjs().format()}] [INFO]` ), typeof args === 'string' ? chalk.yellowBright( args ) : args );
	public static error = ( args: any ) => console.log( chalk.blue( `[${dayjs().format()}] [INFO]` ), typeof args === 'string' ? chalk.redBright( args ) : args );
}