import { AbstractEntity } from 'src/common/abstract.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Roles } from './roles.enum';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Provider } from './provider.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Video } from 'src/video/entities/video.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: [Roles.USER],
    array: true,
  })
  @ApiProperty()
  roles: Roles[];

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  @ApiProperty()
  provider: Provider;

  @OneToMany(() => Video, (video) => video.user)
  videos?: Video[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.provider) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
