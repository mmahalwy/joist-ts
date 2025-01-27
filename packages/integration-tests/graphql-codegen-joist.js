const mappers = {
  AdvanceStatusDetail: "src/entities#AdvanceStatus",
  Author: "src/entities#Author",
  AuthorStat: "src/entities#AuthorStat",
  Book: "src/entities#Book",
  BookAdvance: "src/entities#BookAdvance",
  BookReview: "src/entities#BookReview",
  ColorDetail: "src/entities#Color",
  Comment: "src/entities#Comment",
  Critic: "src/entities#Critic",
  CriticColumn: "src/entities#CriticColumn",
  Image: "src/entities#Image",
  ImageTypeDetail: "src/entities#ImageType",
  Publisher: "src/entities#Publisher",
  PublisherSizeDetail: "src/entities#PublisherSize",
  PublisherTypeDetail: "src/entities#PublisherType",
  Tag: "src/entities#Tag",
};

const enumValues = {
  AdvanceStatus: "src/entities#AdvanceStatus",
  Color: "src/entities#Color",
  ImageType: "src/entities#ImageType",
  PublisherSize: "src/entities#PublisherSize",
  PublisherType: "src/entities#PublisherType",
};

module.exports = { mappers, enumValues };
