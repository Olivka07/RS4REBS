import type { CURRENCIES } from "../consts";


export interface CurrencyInfo {
	"result": string,
	"provider": string,
	"documentation": string,
	"terms_of_use": string,
	"time_last_update_unix": number,
	"time_last_update_utc": string,
	"time_next_update_unix": number,
	"time_next_update_utc": string,
	"time_eol_unix": number,
	"base_code": typeof CURRENCIES[number],
	"rates": {
        [key in typeof CURRENCIES[number]]: number
	}
}