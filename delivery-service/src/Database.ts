import * as mongoose from 'mongoose';

export default class Database {
    public static start = async (): Promise<typeof mongoose> => {
        return mongoose.connect(process.env.MONGO_URL);
    };

    public static close = async (): Promise<void> => {
        mongoose.connection.close();
    };
}
