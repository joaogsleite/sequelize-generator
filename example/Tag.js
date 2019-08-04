import Sequelize, { Model } from 'sequelize'

import Post from './Post'

export default class Tag extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
      
    }
    const options = { tableName: 'tags', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return Tag.findOne({ where })
  }
  static associate () {
    Tag.belongsToMany(Post, {
      through: 'posttag',
      foreignKey: 'tagId',
      otherKey: 'postId',
    })        
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      
    }
  }
}
