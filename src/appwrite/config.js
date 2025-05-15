import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
// we will write Queries to meet desired conditions in Methods as parameter

export class Service {
    client = new Client();
    account;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            )

        } catch (error) {
            console.log("Appwrite services :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite services :: UpdatePost :: error", error)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            console.log("Appwrite services :: DeletePost :: error", error)
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug
            )
        }catch(error){
            console.log("Appwrite services :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(quries = [Query.equal("Status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quries
            )
        }catch(error){
            console.log("Appwrite services :: getPosts :: error", error)
            return false;
        }
    }

    // file Upload services

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch (error) {
            console.log("Appwrite services :: uploadFile :: error", error)
            return false;
        }
    }

    async deleteFile(fileID){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        }catch (error) {
            console.log("Appwrite services :: deletePost :: error", error)
            return false;
        }
    }

    getFileView(fileID){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileID
        )

    }   
}



const service = new Service()
export default service