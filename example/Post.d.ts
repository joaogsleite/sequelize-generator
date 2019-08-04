import Sequelize, {
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
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Instance,
} from 'sequelize'

import { Tag } from './Tag'
import { User } from './User'

declare class Post extends Model {
  public id!: number
  
  public title!: String   

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<Post>
    
  public getTags!: BelonTagToManyGetAssociationsMixin<Tag>;
  public setTags!: BelonTagToManySetAssociationsMixin<Tag, Tag['id'], 'posttag'>;
  public addTag!: BelonTagToManyAddAssociationMixin<Tag, Tag['id'], 'posttag'>;
  public addTags!: BelonTagToManyAddAssociationsMixin<Tag, Tag['id'], 'posttag'>;
  public createTag!: BelonTagToManyCreateAssociationMixin<Tag, Tag['id'], 'posttag'>;
  public removeTag!: BelonTagToManyRemoveAssociationMixin<Tag, Tag['id']>;
  public removeTags!: BelonTagToManyRemoveAssociationsMixin<Tag, Tag['id']>;
  public hasTag!: BelonTagToManyHasAssociationMixin<Tag, Tag['id']>;
  public hasTags!: BelonTagToManyHasAssociationsMixin<Tag, Tag['id']>;
  public countTags!: BelonTagToManyCountAssociationsMixin;
      
  public getUser: BelongsToGetAssociationMixin<User>;
  public setUser: BelongsToSetAssociationMixin<User, User['id']>;
  public createUser: BelongsToCreateAssociationMixin<User, User>;
    
  public static associations: {        
  }
}

export default Post
