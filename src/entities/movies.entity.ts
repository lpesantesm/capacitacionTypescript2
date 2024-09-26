import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'movies', schema: 'security'})
export class MovieEntity {
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

  @CreateDateColumn({
    name: 'create_at'
  })
  createdAt!: string;

  @UpdateDateColumn(
    { name: 'update_at' })
  updatedAt!: string;
}