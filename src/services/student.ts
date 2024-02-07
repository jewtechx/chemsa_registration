import IService,{IAppContext} from "../types/app";
import { ICreateStudentInput } from "../types/student";
import { __generateQuery } from "../utils/query";

export default class StudentService extends IService {
    constructor(context: IAppContext) {
        super(context)
    }

    // create a new student
    async createOne(input: ICreateStudentInput, {user}, session) {
        try {
            if(!user) throw new Error("Unauthorized")

            const _student = await this.db.studentModel.findOne({
                studentID: input.studentID,
                year: "2023-2024",
            })

            if (_student) throw new Error("Student Already Exist");

            const student = new this.db.studentModel({
                ...input,
                year: "2023-2024",
                createdBy: user._id,
            });

            await student.save({session})
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    //update a student
    async updateOne({input}, { user }, session){
        try{
            if(!user) throw new Error("Unauthorized")
            
            const _student = await this.db.studentModel.findOne({
                _id: input.studentObjectID,
            });

            if (!_student) throw new Error("Student does not Exist");

            await _student.updateOne(
                {
                    $set: {
                        ...input,
                        updatedBy: user._id,
                    },
                },
                { session }
            );
            return "Student Updated Successfully";
        }catch (e) {
            throw e;
        }
    }

    // delete a student 
    async deleteOne({ input }, { user }, session) {
        try {
            if (!user) throw new Error("Unauthorized");

            const student = await this.db.studentModel.findByIdAndDelete(input.studentID, {
                session,
            });
            if (!student) throw new Error("student Not Found");
            return user;
        } catch (e) {
            throw e;
        }
    }

    // get many
    async getMany({filter, search, populate, pagination}, {user}) {
        try {
            if(!user) throw new Error("Unauthorized")

            const generatedQuery = __generateQuery("Student", {
                filter,
                search,
                populate:populate,
                pagination,
                sort: {createdAt: "desc"}
            })

            const students = this.db.studentModel
            .find(generatedQuery.filter)
            .sort(generatedQuery.sort)
            .skip(generatedQuery.skip)
            .limit(generatedQuery.limit)
            .populate(generatedQuery.populate)
            .exec();

            const studentCount = await this.db.studentModel.countDocuments(generatedQuery.filter)

            if(!students) throw new Error("Students not found")

            return {students,studentCount}
        }catch(e){
            throw e
        }
    }

    // get one

    async getOne ({filter, search , populate}, {user}) {
        try {
            if(!user) throw new Error("Unauthorized")
            
            const generatedQuery = __generateQuery("Student", {
                filter,
                populate,
                search
            })

            const student = await this.db.studentModel
            .find(generatedQuery.filter)
            .sort(generatedQuery.sort)
            .populate(generatedQuery.populate)
            .exec()

            
            if (!student) {
                throw new Error("student Not Found");
            }

            return student

        } catch (e) {
            throw e;
        }
    }

    // L100s
    async countLevel100({filter},{user}) {
        try {
            if (!user) throw new Error("Unauthorized")

            const count = await this.db.studentModel.countDocuments({
                year: filter.year.eq,
                level: "100"
            })

            return count
        }catch(e){
            throw e
        }
    }
    // L200s
    async countLevel200({filter},{user}) {
        try {
            if (!user) throw new Error("Unauthorized")

            const count = await this.db.studentModel.countDocuments({
                year: filter.year.eq,
                level: "200"
            })

            return count
        }catch(e){
            throw e
        }
    }
    // L300s
    async countLevel300({filter},{user}) {
        try {
            if (!user) throw new Error("Unauthorized")

            const count = await this.db.studentModel.countDocuments({
                year: filter.year.eq,
                level: "300"
            })

            return count
        }catch(e){
            throw e
        }
    }

    // L400s
    async countLevel400({filter},{user}) {
        try {
            if (!user) throw new Error("Unauthorized")

            const count = await this.db.studentModel.countDocuments({
                year: filter.year.eq,
                level: "400"
            })

            return count
        }catch(e){
            throw e
        }
    }
}
