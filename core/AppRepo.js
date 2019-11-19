class AppRepo{

    constructor(conn){
        this.db = conn;
        this.tableName = undefined;
    }

    findById(id){
        return this.db.table(this.tableName).where({id})
            .then(results => results.shift())
    }

    /**
     * Returns the data with it's ID
     *
     * @param data
     * @returns {Promise<unknown>}
     */
    create(data){
        //we can throw an error if sub class has no table name set
        return this.db.table(this.tableName).insert(data).then(result => {
            return result.shift();
        });
    }
}

module.exports = AppRepo;