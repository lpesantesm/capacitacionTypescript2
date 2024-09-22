import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'user', schema: 'security'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true, nullable: true, length: 60
  })
  name!: string;

  @Column({
    name: 'status', type: 'boolean', default: true })
  status!: boolean;

  @Column({ type: 'varchar'})
  lastName!: string

  @Column({ type: 'json'})
  body!: string

  @CreateDateColumn({
    name: 'create_at'
  })
  createdAt!: string;

  @UpdateDateColumn(
    { name: 'update_at' })
  updatedAt!: string;
}