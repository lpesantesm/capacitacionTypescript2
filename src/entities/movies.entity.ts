import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'movies', schema: 'security' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true, type: "varchar", length: 60
  })
  name!: string;

  @Column({
    nullable: true, type: "int", name: "user_id"
  })
  userId!: number;

  @Column({
    nullable: true, type: "varchar"
  })
  description!: string;

  @Column({
    nullable: true, type: "int"
  })
  value!: number;

  @Column({
    nullable: true, type: "date",
  })
  age!: Date;

  @Column({
    name: 'status', type: 'boolean', default: true
  })
  status!: boolean;

  @CreateDateColumn({
    name: 'create_at'
  })
  createdAt!: string;

  @UpdateDateColumn(
    { name: 'update_at' })
  updatedAt!: string;
}