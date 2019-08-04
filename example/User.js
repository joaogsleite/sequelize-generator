import Sequelize, { Model } from 'sequelize'

import Post from './Post'

export default class User extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      
    }
    const options = { tableName: 'users', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return User.findOne({ where })
  }
  static associate () {
    User.hasMany(Post, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'posts',
    })        
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      
    }
  }
}
