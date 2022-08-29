import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinTable, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from './product.entity';

@Entity('product_variations')
export class ProductVariation {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ default: 0 })
  weight: number;

  @Column({ default: 0 })
  length: number;

  @Column({ unique: true, default: '' })
  SKU: string;

  @Column({ unique: true })
  product_code: number;

  @Column()
  purchase_date: Date;

  @ManyToOne(() => Product)
  parent: Product; 

//   @ManyToOne(() => Purchase)
//   purchase_date: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}