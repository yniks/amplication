import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class GitPullRequest {
  @Field(() => String, { nullable: false })
  htmlUrl!: string;

  @Field(() => String, { nullable: false })
  sha!: string;
}
