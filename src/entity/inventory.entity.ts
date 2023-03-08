import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductVariation } from './product-variation.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn("uuid")
    id : string

    // As per discussion to use SKU instead of production variation id
    @OneToOne(() => ProductVariation, product_variation => product_variation.SKU )
    @JoinColumn({name: "SKU"})
    SKU: string

    @Column()
    stockCount: number

    // When the product is first created
    @CreateDateColumn()
    createdAt: Date; 

    // When the product inventory (count) is being updated
    @UpdateDateColumn()
    updatedAt: Date; 

}