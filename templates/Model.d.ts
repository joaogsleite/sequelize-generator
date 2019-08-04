import Sequelize, {
  <% if (relations.find(r => r.type==='n:n')) { -%>
BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  <% } -%>
<% if (relations.find(r => r.type==='n:1')) { -%>
BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  <% } -%>
<% if (relations.find(r => r.type==='1:n')) { -%>
HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  <% } -%>
Instance,
} from 'sequelize'
<% relations.forEach(function({ model }){ %>
import { <%= model %> } from './<%= model %>'<% -%>
<% }); %>

declare class <%= modelName %> extends Model {
  public id!: number
  <% Object.keys(fields).forEach(function(field){ %>
  public <%= field %>!: <%= fields[field] -%>
  <% }); %> 

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<<%= modelName %>>
  <% relations.forEach(function({ model, type, table }){ -%>
  <% if (type === 'n:n') { %>
  public get<%= model %>s!: BelonTagToManyGetAssociationsMixin<<%= model %>>;
  public set<%= model %>s!: BelonTagToManySetAssociationsMixin<<%= model %>, <%= model %>['id'], '<%= table %>'>;
  public add<%= model %>!: BelonTagToManyAddAssociationMixin<<%= model %>, <%= model %>['id'], '<%= table %>'>;
  public add<%= model %>s!: BelonTagToManyAddAssociationsMixin<<%= model %>, <%= model %>['id'], '<%= table %>'>;
  public create<%= model %>!: BelonTagToManyCreateAssociationMixin<<%= model %>, <%= model %>['id'], '<%= table %>'>;
  public remove<%= model %>!: BelonTagToManyRemoveAssociationMixin<<%= model %>, <%= model %>['id']>;
  public remove<%= model %>s!: BelonTagToManyRemoveAssociationsMixin<<%= model %>, <%= model %>['id']>;
  public has<%= model %>!: BelonTagToManyHasAssociationMixin<<%= model %>, <%= model %>['id']>;
  public has<%= model %>s!: BelonTagToManyHasAssociationsMixin<<%= model %>, <%= model %>['id']>;
  public count<%= model %>s!: BelonTagToManyCountAssociationsMixin;
  <% } else if (type === 'n:1') { %>
  public get<%= model %>: BelongsToGetAssociationMixin<<%= model %>>;
  public set<%= model %>: BelongsToSetAssociationMixin<<%= model %>, <%= model %>['id']>;
  public create<%= model %>: BelongsToCreateAssociationMixin<<%= model %>, <%= model %>>;
  <% } else if (type === '1:n') { %>
  public get<%= model %>s!: HasManyGetAssociationsMixin<<%= model %>>
  public add<%= model %>!: HasManyAddAssociationMixin<<%= model %>, number>
  public has<%= model %>!: HasManyHasAssociationMixin<<%= model %>, number>
  public count<%= model %>s!: HasManyCountAssociationsMixin
  public create<%= model %>!: HasManyCreateAssociationMixin<<%= model %>>
  public readonly <%= model.toLowerCase() %>s?: <%= model %>[]
  <% } -%>
  <% }) %>
  public static associations: {<%
    relations.forEach(function({ model, type }){ -%>
    <% if (type === '1:n') { %>
    <%= model.toLowerCase() %>s: Association<<%= modelName %>, <%= model %>>,<% -%>
    <% }
    }) %>
  }
}

export default <%= modelName %>
