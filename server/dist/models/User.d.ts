import { Schema, Document } from 'mongoose';
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    queue?: number[];
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, Schema<IUser, import("mongoose").Model<IUser, any, any, any, Document<unknown, any, IUser, any, {}> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IUser, Document<unknown, {}, import("mongoose").FlatRecord<IUser>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<IUser> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=User.d.ts.map