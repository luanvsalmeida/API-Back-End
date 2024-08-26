const { Sequelize, DataTypes} = require('sequelize');

// DB connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Scheme
// Admin table
const AdminModel = sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hire_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set to the current date and time
        allowNull: false
    }
});

// Customer table
const CustomerModel = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// Book table
const BookModel = sequelize.define('Book', {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    book_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false     
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Order table
const OrderModel = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,   
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CustomerModel,
            key: 'customer_id'
        },
        allowNull: false
    }
});

// Item (of the order) table
const ItemModel = sequelize.define('Item', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

//Relations
CustomerModel.hasMany(OrderModel, {
    foreignKey: 'customer_id',  // Foreign key in table Order
    as: 'orders'                // Alias
});

OrderModel.belongsTo(CustomerModel, {
    foreignKey: 'customer_id',
    as: 'customer'
});

OrderModel.hasMany(ItemModel, {
    foreignKey: 'order_id',     // Foreign key in Item table
    as: 'items'
});

ItemModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order'
});

BookModel.belongsToMany(OrderModel, {
    through: ItemModel,         // Intermediate table that references Books and Order
    foreignKey: 'book_id',      // Foreign key in Item table for Book
    otherKey: 'order_id',       // Foreign key in Item table for Order
    as: 'orders'
});

OrderModel.belongsToMany(BookModel, {
    through: ItemModel,
    foreignKey: 'order_id',     // Foreign key in Item table for Order
    otherKey: 'book_id',        // Foreign key in Item table for Book
    as: 'books'
});

module.exports = {
    sequelize: sequelize,
    AdminModel: AdminModel,
    CustomerModel: CustomerModel,
    BookModel: BookModel,
    OrderModel: OrderModel,
    ItemModel: ItemModel
};

