module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbmlDataOne = `
Table users {
  id int [pk, increment]
  user_name string
  password string
  email string
}

Table diagrams {
  id int [pk]
  user_id fk
  title string
  dbml_data text
}

Ref: users.id < diagrams.user_id`;

    const dbmlDataTwo = `

Table users {
  id int [pk]
  full_name varchar
  created_at timestamp
  country_code int
}

Table countries {
  code int [pk]
  name varchar
  continent_name varchar
}

Table orders {
  id int [pk]
  user_id int
  status varchar
  created_at varchar
}

Table order_items {
  order_id int
  product_id int
  quantity int
}

Table products {
  id int [pk]
  name varchar
  merchant_id int
  price int
  status products_status
  created_at datetime
}

Ref: users.country_code > countries.code
Ref: users.id < orders.user_id
Ref: order_items.product_id > products.id
Ref: order_items.order_id > orders.id
`;

    const seedOne = {
      title: 'dbrama schema',
      dbml_data: dbmlDataOne,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const seedTwo = {
      title: 'online store schema',
      dbml_data: dbmlDataTwo,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const diagramSeedData = [seedOne, seedTwo];

    await queryInterface.bulkInsert('diagrams', diagramSeedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('diagrams', null, {});
  },
};
