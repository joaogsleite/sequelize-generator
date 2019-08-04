import Sequelize, { Model } from 'sequelize'

import Tag from './Tag'
import User from './User'

export default class Post extends Model {
  static init (sequelize) {
    const schema = {
      title: Sequelize.STRING,
      
    }
    const options = { tableName: 'posts', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return Post.findOne({ where })
  }
  static associate () {
    Post.belongsToMany(Tag, {
      through: 'posttag',
      foreignKey: 'postId',
      otherKey: 'tagId',
    })            
  }
  
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      
    }
  }
}
