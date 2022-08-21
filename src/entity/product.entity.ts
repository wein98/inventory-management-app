import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinTable, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

export enum PRODUCT_CATEGORY {
  NECKLACE = 'necklace',
  BRACELET = 'bracelet',
  RING = 'ring',
  EARRING = 'earring'
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY})
  category: PRODUCT_CATEGORY;
  
  @Column({ default: 0 })
  weight: number;

  @Column({ default: 0 })
  length: number;

  @Column({ unique: true, default: '' })
  SKU: string;

  @Column({ unique: true })
  product_code: string;
}