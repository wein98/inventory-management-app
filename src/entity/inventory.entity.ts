import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';  from "typeorm";

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn("uuid")
    id : string

    // TODO: product-variation Ids (?)
    @Column()
    product_variation_id: string

    @Column()
    productName: string 

    @Column()
    stockCount: number 

}

