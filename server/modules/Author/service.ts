import { IAuthor, createAuthor, createAuthors } from './interface';
import * as BlueBird from 'bluebird';
const model = require('../../models');

class Author implements IAuthor {
    public id: number;
    public name: string;

    constructor(){

    }
    create(author: any){
        return model.Author.create(author);
    }

    getAll(): BlueBird<IAuthor[]> {
        return model.Author.findAll({
            order: ['name'],
            include: [ { model: model.Post } ]
        })
        .then(createAuthors);
    }

    getById(id: number): BlueBird<IAuthor> {
        return model.Author.findOne({
            where: {id},
            include: [ { model: model.Post } ]
        })
        .then(createAuthor);
    }

    update(id: number, author: any){
        return model.Author.update(author, {
            where: {id},
            fields: ['name'],
            hooks: true,
            individualHooks: true
          });
    }
    
    delete(id: number){
        return model.Author.destroy({
            where: {id}
          });
    }
}
export default new Author();
