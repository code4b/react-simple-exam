import { DB } from "../db/data";


class Util {
    static getCategories = () => {
        return [...new Set(DB.map(items=>items.category))];
    };
    static getQuizByCat = (category) => {
        return DB.filter(items=>items.category===category)
    };
}

export default Util;