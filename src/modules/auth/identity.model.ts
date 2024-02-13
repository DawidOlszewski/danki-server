import { UUID } from 'src/types/uuid.type';
import { Model } from '../database/model';
import { User } from '../users/user.model';

type ProviderId = string;
export class Identity extends Model {
  provider = 'google';
  providerId!: ProviderId;
  userId!: UUID;
  user?: User;

  static get tableName() {
    return 'identities';
  }

  static get idColumn() {
    return ['provider', 'providerId'];
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'identities.userId',
          to: 'users.id',
        },
      },
    };
  }
}
