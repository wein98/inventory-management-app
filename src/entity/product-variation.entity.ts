import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinTable, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from './product.entity';

@Entity('product_variations')
export class ProductVariation {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ nullable: false })
  weight: number;

  @Column({ default: 0 })
  length: number;

  @Column({ default: 0 })
  size: number;

  @Column({ default: '' })
  color: string;

  @Column({ unique: true, default: '', nullable: false })
  SKU: string;

  @Column({ unique: true, nullable: false })
  product_code: string;

  @Column({ default: 0 })
  workmanship: number;

  @ManyToOne(() => Product,product => product.id)
  @JoinColumn({ name: "parent_id" })
  parent: Product; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  parentSKU: String;
}