import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinTable, JoinColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import { ProductVariation } from './product-variation.entity';

export enum PRODUCT_CATEGORY {
  NECKLACE = 'NECKLACE',
  BRACELET = 'BRACELET',
  RING = 'RING',
  EARRING = 'EARRING'
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY})
  category: PRODUCT_CATEGORY;

  @Column({ default: 0 })
  workmanship: number;

  @Column({ unique: true, default: '' })
  SKU: string;

  @Column({ unique: true })
  product_code: number;

  @OneToMany(() => ProductVariation, productVariation => productVariation.parent)
  product_variations: ProductVariation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}