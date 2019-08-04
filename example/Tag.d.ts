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
  Instance,
} from 'sequelize'

import { Post } from './Post'

declare class Tag extends Model {
  public id!: number
  
  public name!: String   

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<Tag>
    
  public getPosts!: BelonTagToManyGetAssociationsMixin<Post>;
  public setPosts!: BelonTagToManySetAssociationsMixin<Post, Post['id'], 'posttag'>;
  public addPost!: BelonTagToManyAddAssociationMixin<Post, Post['id'], 'posttag'>;
  public addPosts!: BelonTagToManyAddAssociationsMixin<Post, Post['id'], 'posttag'>;
  public createPost!: BelonTagToManyCreateAssociationMixin<Post, Post['id'], 'posttag'>;
  public removePost!: BelonTagToManyRemoveAssociationMixin<Post, Post['id']>;
  public removePosts!: BelonTagToManyRemoveAssociationsMixin<Post, Post['id']>;
  public hasPost!: BelonTagToManyHasAssociationMixin<Post, Post['id']>;
  public hasPosts!: BelonTagToManyHasAssociationsMixin<Post, Post['id']>;
  public countPosts!: BelonTagToManyCountAssociationsMixin;
    
  public static associations: {    
  }
}

export default Tag
