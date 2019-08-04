import Sequelize, { Model } from 'sequelize'
<% relations.forEach(function({ model }){ %>
import <%= model %> from './<%= model %>'<% -%>
<% }) %>

export default class <%= modelName %> extends Model {
  static init (sequelize) {
    const schema = {
      <% Object.keys(fields).forEach(function(field){ -%>
<%= field %>: Sequelize.<%= fields[field].toUpperCase() %>,
      <% }); %>
    }
    const options = { tableName: '<%= tableName %>', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return <%= modelName %>.findOne({ where })
  }
  static associate () {<%
    relations.forEach(function({ model, type, table, field, otherField }){
    if (type === 'n:n') { %>
    <%= modelName %>.belongsToMany(<%= model %>, {
      through: '<%= table %>',
      foreignKey: '<%= field %>',
      otherKey: '<%= otherField %>',
    })<% -%>
    <% } else if (type === '1:n') { %>
    <%= modelName %>.hasMany(<%= model %>, {
      sourceKey: 'id',
      foreignKey: '<%= field %>',
      as: '<%= table %>',
    })<% -%>
    <% } -%>
    <% }) %>
  }
  
  toJSON() {
    return {
      id: this.id,
      <% Object.keys(fields).forEach(function(field){ -%>
<%= field %>: this.<%= field %>,
      <% }); %>
    }
  }
}
