import { FileUpload } from "./types"

import { Context } from "./types"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AccountInfoInput: { // input type
    accountHolder: string; // String!
    accountNumber: string; // String!
    bankName: string; // String!
  }
  AdminOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    loginId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  AdminWhereInput: { // input type
    AND?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    NOT?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    OR?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    loginId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    state?: NexusGenInputs['EnumAdminStateFilter'] | null; // EnumAdminStateFilter
  }
  BoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  BoolNullableFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolNullableFilter'] | null; // NestedBoolNullableFilter
  }
  CategoryOrderByWithRelationInput: { // input type
    a077Code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    b378Code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c1Name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c2Name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c3Name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    c4Name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    siilCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CategoryWhereInput: { // input type
    AND?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    NOT?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    OR?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    a077Code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    b378Code?: NexusGenInputs['IntFilter'] | null; // IntFilter
    c1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c1Name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c2Name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c3Name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    c4Name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    siilCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  CategoryWhereUniqueInput: { // input type
    a077Code?: string | null; // String
    code?: string | null; // String
    id?: number | null; // Int
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  DateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  EnumAdminStateFilter: { // input type
    equals?: NexusGenEnums['AdminState'] | null; // AdminState
    in?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
    not?: NexusGenInputs['NestedEnumAdminStateFilter'] | null; // NestedEnumAdminStateFilter
    notIn?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
  }
  EnumOrderStateFilter: { // input type
    equals?: NexusGenEnums['OrderState'] | null; // OrderState
    in?: NexusGenEnums['OrderState'][] | null; // [OrderState!]
    not?: NexusGenInputs['NestedEnumOrderStateFilter'] | null; // NestedEnumOrderStateFilter
    notIn?: NexusGenEnums['OrderState'][] | null; // [OrderState!]
  }
  EnumProductStateFilter: { // input type
    equals?: NexusGenEnums['ProductState'] | null; // ProductState
    in?: NexusGenEnums['ProductState'][] | null; // [ProductState!]
    not?: NexusGenInputs['NestedEnumProductStateFilter'] | null; // NestedEnumProductStateFilter
    notIn?: NexusGenEnums['ProductState'][] | null; // [ProductState!]
  }
  EnumProductStoreLogUploadStateFilter: { // input type
    equals?: NexusGenEnums['ProductStoreLogUploadState'] | null; // ProductStoreLogUploadState
    in?: NexusGenEnums['ProductStoreLogUploadState'][] | null; // [ProductStoreLogUploadState!]
    not?: NexusGenInputs['NestedEnumProductStoreLogUploadStateFilter'] | null; // NestedEnumProductStoreLogUploadStateFilter
    notIn?: NexusGenEnums['ProductStoreLogUploadState'][] | null; // [ProductStoreLogUploadState!]
  }
  EnumPurchaseLogStateFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogState'] | null; // PurchaseLogState
    in?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
    not?: NexusGenInputs['NestedEnumPurchaseLogStateFilter'] | null; // NestedEnumPurchaseLogStateFilter
    notIn?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
  }
  EnumPurchaseLogTypeFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogType'] | null; // PurchaseLogType
    in?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
    not?: NexusGenInputs['NestedEnumPurchaseLogTypeFilter'] | null; // NestedEnumPurchaseLogTypeFilter
    notIn?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
  }
  EnumTaobaoOrderStateFilter: { // input type
    equals?: NexusGenEnums['TaobaoOrderState'] | null; // TaobaoOrderState
    in?: NexusGenEnums['TaobaoOrderState'][] | null; // [TaobaoOrderState!]
    not?: NexusGenInputs['NestedEnumTaobaoOrderStateFilter'] | null; // NestedEnumTaobaoOrderStateFilter
    notIn?: NexusGenEnums['TaobaoOrderState'][] | null; // [TaobaoOrderState!]
  }
  EnumUserStateFilter: { // input type
    equals?: NexusGenEnums['UserState'] | null; // UserState
    in?: NexusGenEnums['UserState'][] | null; // [UserState!]
    not?: NexusGenInputs['NestedEnumUserStateFilter'] | null; // NestedEnumUserStateFilter
    notIn?: NexusGenEnums['UserState'][] | null; // [UserState!]
  }
  FaqCategoryOrderByWithRelationInput: { // input type
    faq?: NexusGenInputs['FaqOrderByRelationAggregateInput'] | null; // FaqOrderByRelationAggregateInput
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  FaqCategoryWhereInput: { // input type
    AND?: NexusGenInputs['FaqCategoryWhereInput'][] | null; // [FaqCategoryWhereInput!]
    NOT?: NexusGenInputs['FaqCategoryWhereInput'][] | null; // [FaqCategoryWhereInput!]
    OR?: NexusGenInputs['FaqCategoryWhereInput'][] | null; // [FaqCategoryWhereInput!]
    faq?: NexusGenInputs['FaqListRelationFilter'] | null; // FaqListRelationFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    order?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  FaqCategoryWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  FaqListRelationFilter: { // input type
    every?: NexusGenInputs['FaqWhereInput'] | null; // FaqWhereInput
    none?: NexusGenInputs['FaqWhereInput'] | null; // FaqWhereInput
    some?: NexusGenInputs['FaqWhereInput'] | null; // FaqWhereInput
  }
  FaqOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  FaqOrderByWithRelationInput: { // input type
    FaqCategory?: NexusGenInputs['FaqCategoryOrderByWithRelationInput'] | null; // FaqCategoryOrderByWithRelationInput
    categoryId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  FaqWhereInput: { // input type
    AND?: NexusGenInputs['FaqWhereInput'][] | null; // [FaqWhereInput!]
    FaqCategory?: NexusGenInputs['FaqCategoryWhereInput'] | null; // FaqCategoryWhereInput
    NOT?: NexusGenInputs['FaqWhereInput'][] | null; // [FaqWhereInput!]
    OR?: NexusGenInputs['FaqWhereInput'][] | null; // [FaqWhereInput!]
    categoryId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  FaqWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  FloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  FloatNullableFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatNullableFilter'] | null; // NestedFloatNullableFilter
    notIn?: number[] | null; // [Float!]
  }
  IntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  IntNullableFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntNullableFilter'] | null; // NestedIntNullableFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  NestedBoolNullableFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolNullableFilter'] | null; // NestedBoolNullableFilter
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedDateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedEnumAdminStateFilter: { // input type
    equals?: NexusGenEnums['AdminState'] | null; // AdminState
    in?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
    not?: NexusGenInputs['NestedEnumAdminStateFilter'] | null; // NestedEnumAdminStateFilter
    notIn?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
  }
  NestedEnumOrderStateFilter: { // input type
    equals?: NexusGenEnums['OrderState'] | null; // OrderState
    in?: NexusGenEnums['OrderState'][] | null; // [OrderState!]
    not?: NexusGenInputs['NestedEnumOrderStateFilter'] | null; // NestedEnumOrderStateFilter
    notIn?: NexusGenEnums['OrderState'][] | null; // [OrderState!]
  }
  NestedEnumProductStateFilter: { // input type
    equals?: NexusGenEnums['ProductState'] | null; // ProductState
    in?: NexusGenEnums['ProductState'][] | null; // [ProductState!]
    not?: NexusGenInputs['NestedEnumProductStateFilter'] | null; // NestedEnumProductStateFilter
    notIn?: NexusGenEnums['ProductState'][] | null; // [ProductState!]
  }
  NestedEnumProductStoreLogUploadStateFilter: { // input type
    equals?: NexusGenEnums['ProductStoreLogUploadState'] | null; // ProductStoreLogUploadState
    in?: NexusGenEnums['ProductStoreLogUploadState'][] | null; // [ProductStoreLogUploadState!]
    not?: NexusGenInputs['NestedEnumProductStoreLogUploadStateFilter'] | null; // NestedEnumProductStoreLogUploadStateFilter
    notIn?: NexusGenEnums['ProductStoreLogUploadState'][] | null; // [ProductStoreLogUploadState!]
  }
  NestedEnumPurchaseLogStateFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogState'] | null; // PurchaseLogState
    in?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
    not?: NexusGenInputs['NestedEnumPurchaseLogStateFilter'] | null; // NestedEnumPurchaseLogStateFilter
    notIn?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
  }
  NestedEnumPurchaseLogTypeFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogType'] | null; // PurchaseLogType
    in?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
    not?: NexusGenInputs['NestedEnumPurchaseLogTypeFilter'] | null; // NestedEnumPurchaseLogTypeFilter
    notIn?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
  }
  NestedEnumTaobaoOrderStateFilter: { // input type
    equals?: NexusGenEnums['TaobaoOrderState'] | null; // TaobaoOrderState
    in?: NexusGenEnums['TaobaoOrderState'][] | null; // [TaobaoOrderState!]
    not?: NexusGenInputs['NestedEnumTaobaoOrderStateFilter'] | null; // NestedEnumTaobaoOrderStateFilter
    notIn?: NexusGenEnums['TaobaoOrderState'][] | null; // [TaobaoOrderState!]
  }
  NestedEnumUserStateFilter: { // input type
    equals?: NexusGenEnums['UserState'] | null; // UserState
    in?: NexusGenEnums['UserState'][] | null; // [UserState!]
    not?: NexusGenInputs['NestedEnumUserStateFilter'] | null; // NestedEnumUserStateFilter
    notIn?: NexusGenEnums['UserState'][] | null; // [UserState!]
  }
  NestedFloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedFloatNullableFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatNullableFilter'] | null; // NestedFloatNullableFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedIntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedIntNullableFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntNullableFilter'] | null; // NestedIntNullableFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NestedStringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NoticeOrderByWithRelationInput: { // input type
    attachmentFile?: NexusGenEnums['SortOrder'] | null; // SortOrder
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isVisible?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    viewCount?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  NoticeWhereInput: { // input type
    AND?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    NOT?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    OR?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    attachmentFile?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isVisible?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    viewCount?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  NoticeWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OrderListRelationFilter: { // input type
    every?: NexusGenInputs['OrderWhereInput'] | null; // OrderWhereInput
    none?: NexusGenInputs['OrderWhereInput'] | null; // OrderWhereInput
    some?: NexusGenInputs['OrderWhereInput'] | null; // OrderWhereInput
  }
  OrderOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  OrderOrderByWithRelationInput: { // input type
    buyerName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    customId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    deliveryExpiredAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isCustomIdValid?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderProductNumber?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderState?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    originalData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    payPrice?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    quantity?: NexusGenEnums['SortOrder'] | null; // SortOrder
    receiverName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    sellerProductCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    shippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    shippingType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    storeProductId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoOrder?: NexusGenInputs['TaobaoOrderOrderByWithRelationInput'] | null; // TaobaoOrderOrderByWithRelationInput
    taobaoOrderId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userShopData?: NexusGenInputs['UserShopDataOrderByWithRelationInput'] | null; // UserShopDataOrderByWithRelationInput
    userShopDataId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  OrderUQ_order_number_dataCompoundUniqueInput: { // input type
    orderProductNumber: string; // String!
    userShopDataId: number; // Int!
  }
  OrderWhereInput: { // input type
    AND?: NexusGenInputs['OrderWhereInput'][] | null; // [OrderWhereInput!]
    NOT?: NexusGenInputs['OrderWhereInput'][] | null; // [OrderWhereInput!]
    OR?: NexusGenInputs['OrderWhereInput'][] | null; // [OrderWhereInput!]
    buyerName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    customId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    deliveryExpiredAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    isCustomIdValid?: NexusGenInputs['BoolNullableFilter'] | null; // BoolNullableFilter
    optionName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderProductNumber?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderState?: NexusGenInputs['IntFilter'] | null; // IntFilter
    orderedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    originalData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    payPrice?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    productName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    quantity?: NexusGenInputs['IntFilter'] | null; // IntFilter
    receiverName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    sellerProductCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    shippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    shippingType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    state?: NexusGenInputs['EnumOrderStateFilter'] | null; // EnumOrderStateFilter
    storeProductId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    taobaoOrder?: NexusGenInputs['TaobaoOrderWhereInput'] | null; // TaobaoOrderWhereInput
    taobaoOrderId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    userShopData?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    userShopDataId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  OrderWhereUniqueInput: { // input type
    UQ_order_number_data?: NexusGenInputs['OrderUQ_order_number_dataCompoundUniqueInput'] | null; // OrderUQ_order_number_dataCompoundUniqueInput
    id?: string | null; // String
  }
  PlanInfoOrderByWithRelationInput: { // input type
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    externalFeatureVariableId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    month?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    planLevel?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PlanInfoWhereInput: { // input type
    AND?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    NOT?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    OR?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    externalFeatureVariableId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    month?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    planLevel?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  PlanInfoWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductListRelationFilter: { // input type
    every?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    none?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    some?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
  }
  ProductOptionListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    none?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    some?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
  }
  ProductOptionNameListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    none?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    some?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
  }
  ProductOptionNameOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionNameOrderByWithRelationInput: { // input type
    hasImage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isNameTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOptionValue?: NexusGenInputs['ProductOptionValueOrderByRelationAggregateInput'] | null; // ProductOptionValueOrderByRelationAggregateInput
    taobaoPid?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionNameUpdateInput: { // input type
    id: number; // Int!
    name: string; // String!
  }
  ProductOptionNameWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    NOT?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    OR?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    hasImage?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isNameTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    order?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productOptionValue?: NexusGenInputs['ProductOptionValueListRelationFilter'] | null; // ProductOptionValueListRelationFilter
    taobaoPid?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionNameWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductOptionOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionString?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue1?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    optionValue1Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue2?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    optionValue2Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue3?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    optionValue3Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    priceCny?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    stock?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoSkuId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionUQ_product_id_sku_idCompoundUniqueInput: { // input type
    productId: number; // Int!
    taobaoSkuId: string; // String!
  }
  ProductOptionUQ_product_optionCompoundUniqueInput: { // input type
    optionValue1Id: number; // Int!
    optionValue2Id: number; // Int!
    optionValue3Id: number; // Int!
  }
  ProductOptionUpdateInput: { // input type
    id: number; // Int!
    isActive: boolean; // Boolean!
    price: number; // Int!
  }
  ProductOptionValueImageUpdateInput: { // input type
    id: number; // Int!
    image?: string | null; // String
    newImageBase64?: string | null; // String
  }
  ProductOptionValueListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    none?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    some?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
  }
  ProductOptionValueOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionValueOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    image?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isNameTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    number?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionNameOrder?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOption1?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    productOption2?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    productOption3?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    productOptionName?: NexusGenInputs['ProductOptionNameOrderByWithRelationInput'] | null; // ProductOptionNameOrderByWithRelationInput
    productOptionNameId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoVid?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionValueUpdateInput: { // input type
    id: number; // Int!
    image?: string | null; // String
    name: string; // String!
    newImage?: NexusGenScalars['Upload'] | null; // Upload
    newImageBase64?: string | null; // String
  }
  ProductOptionValueWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    NOT?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    OR?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    image?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    isNameTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    number?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionNameOrder?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productOption1?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    productOption2?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    productOption3?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    productOptionName?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    productOptionNameId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    taobaoVid?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionValueWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductOptionWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    NOT?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    OR?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    optionString?: NexusGenInputs['StringFilter'] | null; // StringFilter
    optionValue1?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    optionValue1Id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionValue2?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    optionValue2Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    optionValue3?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    optionValue3Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
    priceCny?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    stock?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    taobaoSkuId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionWhereUniqueInput: { // input type
    UQ_product_id_sku_id?: NexusGenInputs['ProductOptionUQ_product_id_sku_idCompoundUniqueInput'] | null; // ProductOptionUQ_product_id_sku_idCompoundUniqueInput
    UQ_product_option?: NexusGenInputs['ProductOptionUQ_product_optionCompoundUniqueInput'] | null; // ProductOptionUQ_product_optionCompoundUniqueInput
    id?: number | null; // Int
  }
  ProductOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOrderByWithRelationInput: { // input type
    admin?: NexusGenInputs['AdminOrderByWithRelationInput'] | null; // AdminOrderByWithRelationInput
    adminId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    category?: NexusGenInputs['CategoryOrderByWithRelationInput'] | null; // CategoryOrderByWithRelationInput
    categoryCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    imageThumbnailData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isImageTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isNameTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    localShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenInputs['OrderOrderByRelationAggregateInput'] | null; // OrderOrderByRelationAggregateInput
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOption?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    productOptionName?: NexusGenInputs['ProductOptionNameOrderByRelationAggregateInput'] | null; // ProductOptionNameOrderByRelationAggregateInput
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    shippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siilCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siilData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    stockUpdatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoProduct?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'] | null; // TaobaoProductOrderByWithRelationInput
    taobaoProductId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreListRelationFilter: { // input type
    every?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    none?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    some?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
  }
  ProductStoreLogListRelationFilter: { // input type
    every?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    none?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    some?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
  }
  ProductStoreLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreLogOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    destState?: NexusGenEnums['SortOrder'] | null; // SortOrder
    errorMessage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    jobId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStore?: NexusGenInputs['ProductStoreOrderByWithRelationInput'] | null; // ProductStoreOrderByWithRelationInput
    productStoreId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreState?: NexusGenInputs['ProductStoreStateOrderByWithRelationInput'] | null; // ProductStoreStateOrderByWithRelationInput
    uploadState?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreLogWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    NOT?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    OR?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    destState?: NexusGenInputs['IntFilter'] | null; // IntFilter
    errorMessage?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    jobId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    productStore?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    productStoreId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productStoreState?: NexusGenInputs['ProductStoreStateWhereInput'] | null; // ProductStoreStateWhereInput
    uploadState?: NexusGenInputs['EnumProductStoreLogUploadStateFilter'] | null; // EnumProductStoreLogUploadStateFilter
  }
  ProductStoreLogWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductStoreOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreOrderByWithRelationInput: { // input type
    etcVendorItemId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreLog?: NexusGenInputs['ProductStoreLogOrderByRelationAggregateInput'] | null; // ProductStoreLogOrderByRelationAggregateInput
    productStoreState?: NexusGenInputs['ProductStoreStateOrderByWithRelationInput'] | null; // ProductStoreStateOrderByWithRelationInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    storeProductId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userSetData?: NexusGenInputs['UserSetDataOrderByWithRelationInput'] | null; // UserSetDataOrderByWithRelationInput
    userSetDataId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userShopData?: NexusGenInputs['UserShopDataOrderByWithRelationInput'] | null; // UserShopDataOrderByWithRelationInput
    userShopDataId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreStateOrderByWithRelationInput: { // input type
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    productStoreLog?: NexusGenInputs['ProductStoreLogOrderByRelationAggregateInput'] | null; // ProductStoreLogOrderByRelationAggregateInput
  }
  ProductStoreStateWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    NOT?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    OR?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    productStoreLog?: NexusGenInputs['ProductStoreLogListRelationFilter'] | null; // ProductStoreLogListRelationFilter
  }
  ProductStoreWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    NOT?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    OR?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    etcVendorItemId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productStoreLog?: NexusGenInputs['ProductStoreLogListRelationFilter'] | null; // ProductStoreLogListRelationFilter
    productStoreState?: NexusGenInputs['ProductStoreStateWhereInput'] | null; // ProductStoreStateWhereInput
    state?: NexusGenInputs['IntFilter'] | null; // IntFilter
    storeProductId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    userSetData?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    userSetDataId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    userShopData?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    userShopDataId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  ProductStoreWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductThumbnailImageUpdateInput: { // input type
    defaultImage: string; // String!
    uploadImageBase64?: string | null; // String
  }
  ProductThumbnailUpdateInput: { // input type
    defaultImage: string; // String!
    uploadImage?: NexusGenScalars['Upload'] | null; // Upload
  }
  ProductUQ_user_id_taobao_product_idCompoundUniqueInput: { // input type
    taobaoProductId: number; // Int!
    userId: number; // Int!
  }
  ProductWhereInput: { // input type
    AND?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    NOT?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    OR?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    admin?: NexusGenInputs['AdminWhereInput'] | null; // AdminWhereInput
    adminId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    category?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    categoryCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    cnyRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    imageThumbnailData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    isImageTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    isNameTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    localShippingFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    marginRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    order?: NexusGenInputs['OrderListRelationFilter'] | null; // OrderListRelationFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productOption?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    productOptionName?: NexusGenInputs['ProductOptionNameListRelationFilter'] | null; // ProductOptionNameListRelationFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    shippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    siilCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    siilData?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    state?: NexusGenInputs['EnumProductStateFilter'] | null; // EnumProductStateFilter
    stockUpdatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    taobaoProduct?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    taobaoProductId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
  }
  ProductWhereUniqueInput: { // input type
    UQ_user_id_taobao_product_id?: NexusGenInputs['ProductUQ_user_id_taobao_product_idCompoundUniqueInput'] | null; // ProductUQ_user_id_taobao_product_idCompoundUniqueInput
    id?: number | null; // Int
  }
  PurchaseLogListRelationFilter: { // input type
    every?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
    none?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
    some?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
  }
  PurchaseLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PurchaseLogWhereInput: { // input type
    AND?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    NOT?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    OR?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    expiredAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    payAmount?: NexusGenInputs['IntFilter'] | null; // IntFilter
    payId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    planInfo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    purchasedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    state?: NexusGenInputs['EnumPurchaseLogStateFilter'] | null; // EnumPurchaseLogStateFilter
    type?: NexusGenInputs['EnumPurchaseLogTypeFilter'] | null; // EnumPurchaseLogTypeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  SiilInput: { // input type
    code: string; // String!
    value: string; // String!
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  TaobaoOrderOrderByWithRelationInput: { // input type
    buyerMessage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    logisticCompany?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenInputs['OrderOrderByRelationAggregateInput'] | null; // OrderOrderByRelationAggregateInput
    originalData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    realMoney?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoOrderNum?: NexusGenEnums['SortOrder'] | null; // SortOrder
    waybill?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  TaobaoOrderWhereInput: { // input type
    AND?: NexusGenInputs['TaobaoOrderWhereInput'][] | null; // [TaobaoOrderWhereInput!]
    NOT?: NexusGenInputs['TaobaoOrderWhereInput'][] | null; // [TaobaoOrderWhereInput!]
    OR?: NexusGenInputs['TaobaoOrderWhereInput'][] | null; // [TaobaoOrderWhereInput!]
    buyerMessage?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    logisticCompany?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    order?: NexusGenInputs['OrderListRelationFilter'] | null; // OrderListRelationFilter
    originalData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    realMoney?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    state?: NexusGenInputs['EnumTaobaoOrderStateFilter'] | null; // EnumTaobaoOrderStateFilter
    taobaoId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    taobaoOrderNum?: NexusGenInputs['StringFilter'] | null; // StringFilter
    waybill?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  TaobaoOrderWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  TaobaoProductOrderByWithRelationInput: { // input type
    brand?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    imageThumbnail?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    originalData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    taobaoBrandId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoCategoryId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoNumIid?: NexusGenEnums['SortOrder'] | null; // SortOrder
    translateData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    videoUrl?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  TaobaoProductWhereInput: { // input type
    AND?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    NOT?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    OR?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    brand?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    imageThumbnail?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    originalData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    price?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    taobaoBrandId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    taobaoCategoryId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    taobaoNumIid?: NexusGenInputs['StringFilter'] | null; // StringFilter
    translateData?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    videoUrl?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  TaobaoProductWhereUniqueInput: { // input type
    id?: number | null; // Int
    taobaoNumIid?: string | null; // String
  }
  UserCompanyInfoInput: { // input type
    code: string; // String!
    name: string; // String!
    ownerName: string; // String!
  }
  UserCompanyInfoOrderByWithRelationInput: { // input type
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    ownerName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserCompanyInfoWhereInput: { // input type
    AND?: NexusGenInputs['UserCompanyInfoWhereInput'][] | null; // [UserCompanyInfoWhereInput!]
    NOT?: NexusGenInputs['UserCompanyInfoWhereInput'][] | null; // [UserCompanyInfoWhereInput!]
    OR?: NexusGenInputs['UserCompanyInfoWhereInput'][] | null; // [UserCompanyInfoWhereInput!]
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    ownerName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserInfoOrderByWithRelationInput: { // input type
    additionalShippingFeeJeju?: NexusGenEnums['SortOrder'] | null; // SortOrder
    asInformation?: NexusGenEnums['SortOrder'] | null; // SortOrder
    asTel?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeFile?: NexusGenEnums['SortOrder'] | null; // SortOrder
    defaultShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    exchangeShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageBottom?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageTop?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    maxProductLimit?: NexusGenEnums['SortOrder'] | null; // SortOrder
    phone?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productCollectCount?: NexusGenEnums['SortOrder'] | null; // SortOrder
    refundAccountInfoData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    refundShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserInfoWhereInput: { // input type
    AND?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    NOT?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    OR?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    additionalShippingFeeJeju?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    asInformation?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    asTel?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    cnyRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    codeFile?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    defaultShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    exchangeShippingFee?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    fixImageBottom?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    fixImageTop?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    marginRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    maxProductLimit?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    phone?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    productCollectCount?: NexusGenInputs['IntFilter'] | null; // IntFilter
    refundAccountInfoData?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    refundShippingFee?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserLogListRelationFilter: { // input type
    every?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    none?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    some?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
  }
  UserLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserLogOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isRead?: NexusGenEnums['SortOrder'] | null; // SortOrder
    payloadData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserLogWhereInput: { // input type
    AND?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    NOT?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    OR?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isRead?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    payloadData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserLogWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserOrderByWithRelationInput: { // input type
    companyInfo?: NexusGenInputs['UserCompanyInfoOrderByWithRelationInput'] | null; // UserCompanyInfoOrderByWithRelationInput
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    kakaoId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    purchaseLog?: NexusGenInputs['PurchaseLogOrderByRelationAggregateInput'] | null; // PurchaseLogOrderByRelationAggregateInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userInfo?: NexusGenInputs['UserInfoOrderByWithRelationInput'] | null; // UserInfoOrderByWithRelationInput
    userLog?: NexusGenInputs['UserLogOrderByRelationAggregateInput'] | null; // UserLogOrderByRelationAggregateInput
    userQuestion?: NexusGenInputs['UserQuestionOrderByRelationAggregateInput'] | null; // UserQuestionOrderByRelationAggregateInput
    userShopData?: NexusGenInputs['UserShopDataOrderByRelationAggregateInput'] | null; // UserShopDataOrderByRelationAggregateInput
    wordTable?: NexusGenInputs['WordTableOrderByRelationAggregateInput'] | null; // WordTableOrderByRelationAggregateInput
  }
  UserQuestionListRelationFilter: { // input type
    every?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    none?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    some?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
  }
  UserQuestionOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserQuestionOrderByWithRelationInput: { // input type
    answer?: NexusGenEnums['SortOrder'] | null; // SortOrder
    answeredAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    attachmentFile?: NexusGenEnums['SortOrder'] | null; // SortOrder
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserQuestionWhereInput: { // input type
    AND?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    NOT?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    OR?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    answer?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    answeredAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    attachmentFile?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserQuestionWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserSetDataListRelationFilter: { // input type
    every?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    none?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    some?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
  }
  UserSetDataOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserSetDataOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    setFilePath?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userShopData?: NexusGenInputs['UserShopDataOrderByWithRelationInput'] | null; // UserShopDataOrderByWithRelationInput
    userShopDataId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserSetDataWhereInput: { // input type
    AND?: NexusGenInputs['UserSetDataWhereInput'][] | null; // [UserSetDataWhereInput!]
    NOT?: NexusGenInputs['UserSetDataWhereInput'][] | null; // [UserSetDataWhereInput!]
    OR?: NexusGenInputs['UserSetDataWhereInput'][] | null; // [UserSetDataWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    setFilePath?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userShopData?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    userShopDataId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserSetDataWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserShopDataListRelationFilter: { // input type
    every?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    none?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    some?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
  }
  UserShopDataOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserShopDataOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    etc?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenInputs['OrderOrderByRelationAggregateInput'] | null; // OrderOrderByRelationAggregateInput
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    siteCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUserId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUserPw?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siteUseretc6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userSetData?: NexusGenInputs['UserSetDataOrderByRelationAggregateInput'] | null; // UserSetDataOrderByRelationAggregateInput
  }
  UserShopDataUQ_user_shop_data_uniqueCompoundUniqueInput: { // input type
    siteCode: string; // String!
    siteUserId: string; // String!
    userId: number; // Int!
  }
  UserShopDataWhereInput: { // input type
    AND?: NexusGenInputs['UserShopDataWhereInput'][] | null; // [UserShopDataWhereInput!]
    NOT?: NexusGenInputs['UserShopDataWhereInput'][] | null; // [UserShopDataWhereInput!]
    OR?: NexusGenInputs['UserShopDataWhereInput'][] | null; // [UserShopDataWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    etc?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolNullableFilter'] | null; // BoolNullableFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    order?: NexusGenInputs['OrderListRelationFilter'] | null; // OrderListRelationFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    siteCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUserId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUserPw?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    siteUseretc6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    userSetData?: NexusGenInputs['UserSetDataListRelationFilter'] | null; // UserSetDataListRelationFilter
  }
  UserShopDataWhereUniqueInput: { // input type
    UQ_user_shop_data_unique?: NexusGenInputs['UserShopDataUQ_user_shop_data_uniqueCompoundUniqueInput'] | null; // UserShopDataUQ_user_shop_data_uniqueCompoundUniqueInput
    id?: number | null; // Int
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    companyInfo?: NexusGenInputs['UserCompanyInfoWhereInput'] | null; // UserCompanyInfoWhereInput
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    kakaoId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    naverId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    purchaseLog?: NexusGenInputs['PurchaseLogListRelationFilter'] | null; // PurchaseLogListRelationFilter
    state?: NexusGenInputs['EnumUserStateFilter'] | null; // EnumUserStateFilter
    userInfo?: NexusGenInputs['UserInfoWhereInput'] | null; // UserInfoWhereInput
    userLog?: NexusGenInputs['UserLogListRelationFilter'] | null; // UserLogListRelationFilter
    userQuestion?: NexusGenInputs['UserQuestionListRelationFilter'] | null; // UserQuestionListRelationFilter
    userShopData?: NexusGenInputs['UserShopDataListRelationFilter'] | null; // UserShopDataListRelationFilter
    wordTable?: NexusGenInputs['WordTableListRelationFilter'] | null; // WordTableListRelationFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
    kakaoId?: string | null; // String
    naverId?: string | null; // String
  }
  WordTableListRelationFilter: { // input type
    every?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    none?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    some?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
  }
  WordTableOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  WordTableOrderByWithRelationInput: { // input type
    findWord?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    replaceWord?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  WordTableUQ_word_table_wordCompoundUniqueInput: { // input type
    findWord: string; // String!
    userId: number; // Int!
  }
  WordTableWhereInput: { // input type
    AND?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    NOT?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    OR?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    findWord?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    replaceWord?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  WordTableWhereUniqueInput: { // input type
    UQ_word_table_word?: NexusGenInputs['WordTableUQ_word_table_wordCompoundUniqueInput'] | null; // WordTableUQ_word_table_wordCompoundUniqueInput
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  AdminState: "ACTIVE" | "DELETED"
  CategoryStoreState: "CHANGE" | "DELETE" | "NORMAL"
  ExcelSampleEnum: "COLLECT_PRODUCT" | "DENY_WORD" | "REPLACE_WORD"
  OrderState: "CLAIMED" | "NEW" | "ORDERED"
  ProductState: "COLLECTED" | "ON_SALE" | "SELL_DONE" | "UPLOAD_FAILED" | "UPLOAD_WAITING"
  ProductStoreLogUploadState: "CANCEL" | "FAIL" | "ON_PROGRESS" | "SUCCESS" | "WAIT"
  PurchaseLogState: "ACTIVE" | "ENDED" | "REFUNDED" | "WAIT_DEPOSIT" | "WAIT_PAYMENT"
  PurchaseLogType: "IMAGE_TRANSLATE" | "PLAN" | "STOCK"
  SiilItemTypeEnum: "INPUT" | "SELECT" | "YESNO"
  SortOrder: "asc" | "desc"
  TaobaoItemOrderBy: "_credit" | "_sale"
  TaobaoOrderState: "DONE" | "WAIT_CONFIRM" | "WAIT_SEND"
  TranslateEngineEnumType: "baidu" | "google" | "papago"
  TranslateTargetEnumType: "PRODUCT_ALL" | "PRODUCT_NAME" | "PRODUCT_OPTION_ALL" | "PRODUCT_OPTION_NAME" | "PRODUCT_OPTION_VALUE"
  UserLoginType: "ADMIN" | "EMAIL" | "KAKAO" | "NAVER"
  UserPurchaseAdditionalInfoEnumType: "IMAGE_TRANSLATE" | "STOCK"
  UserSocialType: "EMAIL" | "KAKAO" | "NAVER"
  UserState: "ACTIVE" | "DELETED"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
  Upload: FileUpload
}

export interface NexusGenObjects {
  AccountInfo: { // root type
    accountHolder: string; // String!
    accountNumber: string; // String!
    bankName: string; // String!
  }
  Admin: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    loginId: string; // String!
    state: NexusGenEnums['AdminState']; // AdminState!
  }
  Category: { // root type
    a077Code: string; // String!
    b378Code: number; // Int!
    c1: string; // String!
    c1Name: string; // String!
    c2: string; // String!
    c2Name: string; // String!
    c3: string; // String!
    c3Name: string; // String!
    c4: string; // String!
    c4Name: string; // String!
    code: string; // String!
    id: number; // Int!
    siilCode: string; // String!
  }
  CategorySelectType: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryStore: { // root type
    acode: string; // String!
    cateStateCdate?: NexusGenScalars['DateTime'] | null; // DateTime
    cateStatePdate?: NexusGenScalars['DateTime'] | null; // DateTime
    ccode: string; // String!
    dc1: string; // String!
    dc1Name: string; // String!
    dc2: string; // String!
    dc2Name: string; // String!
    dc3: string; // String!
    dc3Name: string; // String!
    dc4: string; // String!
    dc4Name: string; // String!
    id: number; // Int!
    pcode: string; // String!
    state: NexusGenEnums['CategoryStoreState']; // CategoryStoreState!
  }
  Faq: { // root type
    categoryId: number; // Int!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    title: string; // String!
  }
  FaqCategory: { // root type
    id: number; // Int!
    isActive: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
  }
  Mutation: {};
  Notice: { // root type
    attachmentFile?: string | null; // String
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isVisible: boolean; // Boolean!
    title: string; // String!
    viewCount: number; // Int!
  }
  Order: { // root type
    buyerName: string; // String!
    customId: string; // String!
    deliveryExpiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    isCustomIdValid?: boolean | null; // Boolean
    optionName: string; // String!
    orderProductNumber: string; // String!
    orderState: number; // Int!
    orderedAt: NexusGenScalars['DateTime']; // DateTime!
    originalData: string; // String!
    payPrice: number; // Int!
    productId?: number | null; // Int
    productName: string; // String!
    quantity: number; // Int!
    receiverName: string; // String!
    sellerProductCode: string; // String!
    shippingFee: number; // Int!
    state: NexusGenEnums['OrderState']; // OrderState!
    storeProductId: string; // String!
    userShopDataId: number; // Int!
  }
  PhoneVerification: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    tel: string; // String!
    verificationNumber: string; // String!
  }
  PlanInfo: { // root type
    description: string; // String!
    externalFeatureVariableId?: string | null; // String
    id: number; // Int!
    isActive: boolean; // Boolean!
    month: number; // Int!
    name: string; // String!
    planLevel?: number | null; // Int
    price: number; // Int!
  }
  Product: { // root type
    adminId?: number | null; // Int
    categoryCode?: string | null; // String
    cnyRate: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    imageThumbnailData: string; // String!
    isImageTranslated: boolean; // Boolean!
    isNameTranslated: boolean; // Boolean!
    localShippingFee: number; // Float!
    marginRate: number; // Float!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    price: number; // Int!
    productCode: string; // String!
    shippingFee: number; // Int!
    siilCode?: string | null; // String
    siilData?: string | null; // String
    state: NexusGenEnums['ProductState']; // ProductState!
    stockUpdatedAt: NexusGenScalars['DateTime']; // DateTime!
    taobaoProductId: number; // Int!
    userId?: number | null; // Int
  }
  ProductOption: { // root type
    id: number; // Int!
    isActive: boolean; // Boolean!
    optionString: string; // String!
    optionValue1Id: number; // Int!
    optionValue2Id?: number | null; // Int
    optionValue3Id?: number | null; // Int
    price: number; // Int!
    priceCny: number; // Float!
    productId: number; // Int!
    stock?: number | null; // Int
    taobaoSkuId: string; // String!
  }
  ProductOptionName: { // root type
    id: number; // Int!
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
    productId: number; // Int!
    taobaoPid: string; // String!
  }
  ProductOptionValue: { // root type
    id: number; // Int!
    image?: string | null; // String
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    number: number; // Int!
    optionNameOrder: number; // Int!
    productOptionNameId: number; // Int!
    taobaoVid: string; // String!
  }
  ProductStore: { // root type
    etcVendorItemId?: string | null; // String
    id: number; // Int!
    productId: number; // Int!
    state: number; // Int!
    storeProductId?: string | null; // String
    userSetDataId?: number | null; // Int
    userShopDataId: number; // Int!
  }
  ProductStoreLog: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    destState: number; // Int!
    errorMessage: string; // String!
    id: number; // Int!
    jobId: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    productStoreId: number; // Int!
    uploadState: NexusGenEnums['ProductStoreLogUploadState']; // ProductStoreLogUploadState!
  }
  ProductStoreState: { // root type
    description: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  PurchaseLog: { // root type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payAmount: number; // Int!
    payId?: string | null; // String
    planInfo: string; // String!
    purchasedAt: NexusGenScalars['DateTime']; // DateTime!
    state: NexusGenEnums['PurchaseLogState']; // PurchaseLogState!
    type: NexusGenEnums['PurchaseLogType']; // PurchaseLogType!
    userId: number; // Int!
  }
  Query: {};
  SetParamType: { // root type
    encodedSetInfo?: string | null; // String
    number: string; // String!
    siteCode: string; // String!
    siteUserId: string; // String!
    siteUserPw: string; // String!
    siteUseretc1: string; // String!
    siteUseretc2: string; // String!
    siteUseretc3: string; // String!
    siteUseretc4: string; // String!
    siteUseretc5: string; // String!
    siteUseretc6: string; // String!
    sol_type: string; // String!
    userCode: string; // String!
  }
  SignInType: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  SiilItem: { // root type
    code: string; // String!
    inputType: NexusGenEnums['SiilItemTypeEnum']; // SiilItemTypeEnum!
    name: string; // String!
    options?: string[] | null; // [String!]
  }
  SiilItems: { // root type
    data: NexusGenRootTypes['SiilItem'][]; // [SiilItem!]!
    description: string; // String!
  }
  SiilSavedData: { // root type
    code: string; // String!
    data: NexusGenRootTypes['SiilSavedItem'][]; // [SiilSavedItem!]!
  }
  SiilSavedItem: { // root type
    code: string; // String!
    value: string; // String!
  }
  Subscription: {};
  TaobaoOrder: { // root type
    buyerMessage?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    logisticCompany?: string | null; // String
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    originalData: string; // String!
    realMoney?: number | null; // Float
    state: NexusGenEnums['TaobaoOrderState']; // TaobaoOrderState!
    taobaoId: string; // String!
    taobaoOrderNum: string; // String!
    waybill?: string | null; // String
  }
  TaobaoProduct: { // root type
    brand: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imageThumbnail: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    originalData: string; // String!
    price: number; // Float!
    taobaoBrandId?: string | null; // String
    taobaoCategoryId: string; // String!
    taobaoNumIid: string; // String!
    videoUrl?: string | null; // String
  }
  TaobaoProductOption: { // root type
    name: string; // String!
    taobaoSkuId: string; // String!
  }
  TaobaoProductOptionInfo: { // root type
    option: NexusGenRootTypes['TaobaoProductOption'][]; // [TaobaoProductOption!]!
    optionName: NexusGenRootTypes['TaobaoProductOptionName'][]; // [TaobaoProductOptionName!]!
    optionValue: NexusGenRootTypes['TaobaoProductOptionValue'][]; // [TaobaoProductOptionValue!]!
  }
  TaobaoProductOptionName: { // root type
    name: string; // String!
    taobaoPid: string; // String!
  }
  TaobaoProductOptionValue: { // root type
    image?: string | null; // String
    name: string; // String!
    taobaoVid: string; // String!
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    kakaoId?: string | null; // String
    naverId?: string | null; // String
    state: NexusGenEnums['UserState']; // UserState!
  }
  UserCompanyInfo: { // root type
    code: string; // String!
    name: string; // String!
    ownerName: string; // String!
    userId: number; // Int!
  }
  UserInfo: { // root type
    additionalShippingFeeJeju?: number | null; // Int
    asInformation?: string | null; // String
    asTel?: string | null; // String
    cnyRate: number; // Float!
    codeFile?: string | null; // String
    defaultShippingFee: number; // Int!
    exchangeShippingFee?: number | null; // Int
    fixImageBottom?: string | null; // String
    fixImageTop?: string | null; // String
    marginRate: number; // Float!
    maxProductLimit?: number | null; // Int
    phone?: string | null; // String
    productCollectCount: number; // Int!
    refundAccountInfoData?: string | null; // String
    refundShippingFee?: number | null; // Int
    userId: number; // Int!
  }
  UserLog: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isRead: boolean; // Boolean!
    payloadData: string; // String!
    title: string; // String!
    userId: number; // Int!
  }
  UserPurchaseAdditionalInfo: { // root type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['UserPurchaseAdditionalInfoEnumType']; // UserPurchaseAdditionalInfoEnumType!
  }
  UserPurchaseInfo: { // root type
    additionalInfo: NexusGenRootTypes['UserPurchaseAdditionalInfo'][]; // [UserPurchaseAdditionalInfo!]!
    level: number; // Int!
    levelExpiredAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserQuestion: { // root type
    answer?: string | null; // String
    answeredAt?: NexusGenScalars['DateTime'] | null; // DateTime
    attachmentFile?: string | null; // String
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isActive: boolean; // Boolean!
    title: string; // String!
    userId: number; // Int!
  }
  UserSetData: { // root type
    id: number; // Int!
    name: string; // String!
    setFilePath: string; // String!
    userShopDataId: number; // Int!
  }
  UserShopData: { // root type
    id: number; // Int!
    siteCode: string; // String!
    siteUserId: string; // String!
    userId: number; // Int!
  }
  WordTable: { // root type
    findWord: string; // String!
    id: number; // Int!
    replaceWord?: string | null; // String
    userId: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AccountInfo: { // field return type
    accountHolder: string; // String!
    accountNumber: string; // String!
    bankName: string; // String!
  }
  Admin: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    loginId: string; // String!
    state: NexusGenEnums['AdminState']; // AdminState!
  }
  Category: { // field return type
    a077Code: string; // String!
    b378Code: number; // Int!
    c1: string; // String!
    c1Name: string; // String!
    c2: string; // String!
    c2Name: string; // String!
    c3: string; // String!
    c3Name: string; // String!
    c4: string; // String!
    c4Name: string; // String!
    code: string; // String!
    id: number; // Int!
    siilCode: string; // String!
  }
  CategorySelectType: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryStore: { // field return type
    acode: string; // String!
    cateStateCdate: NexusGenScalars['DateTime'] | null; // DateTime
    cateStatePdate: NexusGenScalars['DateTime'] | null; // DateTime
    ccode: string; // String!
    dc1: string; // String!
    dc1Name: string; // String!
    dc2: string; // String!
    dc2Name: string; // String!
    dc3: string; // String!
    dc3Name: string; // String!
    dc4: string; // String!
    dc4Name: string; // String!
    id: number; // Int!
    pcode: string; // String!
    state: NexusGenEnums['CategoryStoreState']; // CategoryStoreState!
  }
  Faq: { // field return type
    FaqCategory: NexusGenRootTypes['FaqCategory']; // FaqCategory!
    categoryId: number; // Int!
    content: string; // String!
    contentSummary: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    title: string; // String!
  }
  FaqCategory: { // field return type
    faq: NexusGenRootTypes['Faq'][]; // [Faq!]!
    id: number; // Int!
    isActive: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
  }
  Mutation: { // field return type
    addSetDataByUser: NexusGenRootTypes['UserShopData']; // UserShopData!
    addWordByExcelByUser: boolean; // Boolean!
    addWordByUser: boolean; // Boolean!
    cancelPurchasePlanByUser: boolean; // Boolean!
    changeMyPasswordByAdmin: boolean; // Boolean!
    changeOrderStateByUser: string; // String!
    changePasswordByUser: boolean; // Boolean!
    connectSocialIdByUser: NexusGenRootTypes['User']; // User!
    createFaqByAdmin: boolean; // Boolean!
    createFaqCategoryByAdmin: NexusGenRootTypes['FaqCategory']; // FaqCategory!
    createNoticeByAdmin: boolean; // Boolean!
    createShopDataByUser: NexusGenRootTypes['UserShopData']; // UserShopData!
    createUserQuestionByUser: boolean; // Boolean!
    deleteFaqByAdmin: number; // Int!
    deleteFaqCategoryByAdmin: boolean; // Boolean!
    deleteNoticeByAdmin: number; // Int!
    deleteProductByAdmin: boolean; // Boolean!
    deleteProductByUser: boolean; // Boolean!
    deleteWordByUser: boolean; // Boolean!
    endProductSellStateByAdmin: number; // Int!
    endProductSellStateByUser: number; // Int!
    getTaobaoItemUsingExcelFileByAdmin: number; // Int!
    getTaobaoItemUsingExcelFileByUser: number; // Int!
    getTaobaoItemUsingExtensionByUser: string; // String!
    getTaobaoItemUsingNumIidsByAdmin: number; // Int!
    getTaobaoItemUsingNumIidsByUser: number; // Int!
    getTaobaoItemsByAdmin: boolean; // Boolean!
    getTaobaoItemsByUser: boolean; // Boolean!
    invalidatePurchaseInfoByAdmin: boolean; // Boolean!
    modifyFaqCategoryByAdmin: NexusGenRootTypes['FaqCategory']; // FaqCategory!
    modifyWordByUser: boolean; // Boolean!
    purchasePlanByUser: number; // Int!
    registerProductByUser: string; // String!
    registerProductsByAdmin: string; // String!
    registerProductsByUser: string; // String!
    renewToken: NexusGenRootTypes['SignInType'] | null; // SignInType
    requestPhoneVerificationByEveryone: boolean; // Boolean!
    scrapOrderByUser: string; // String!
    setMaxProductLimitByAdmin: boolean; // Boolean!
    setPurchaseInfoByAdmin: boolean; // Boolean!
    signInAdminByEveryone: NexusGenRootTypes['SignInType']; // SignInType!
    signInUserByEveryone: NexusGenRootTypes['SignInType']; // SignInType!
    signInUserForImageProgramByEveryone: string; // String!
    signUpAdminByAdmin: boolean; // Boolean!
    signUpUserByEveryone: NexusGenRootTypes['SignInType']; // SignInType!
    sortFaqCategoryByAdmin: boolean; // Boolean!
    t_createProduct: boolean | null; // Boolean
    transferProductsToUserByAdmin: string; // String!
    translateProductTextByUser: string; // String!
    translateProductsTextByUser: string; // String!
    updateCategoryStoreDataByAdmin: boolean; // Boolean!
    updateCnyRateByAdmin: number; // Float!
    updateFaqByAdmin: boolean; // Boolean!
    updateFreeUserDayLimitByAdmin: number; // Int!
    updateFreeUserProductLimitByAdmin: number; // Int!
    updateManyProductCategoryByAdmin: number; // Int!
    updateManyProductCategoryByUser: number; // Int!
    updateManyProductSiilInfoByAdmin: number; // Int!
    updateManyProductSiilInfoByUser: number; // Int!
    updateMyDataByUser: boolean; // Boolean!
    updateNoticeByAdmin: boolean; // Boolean!
    updatePhoneByUser: boolean; // Boolean!
    updatePlanInfoByAdmin: NexusGenRootTypes['PlanInfo']; // PlanInfo!
    updateProductByAdmin: NexusGenRootTypes['Product']; // Product!
    updateProductByUser: NexusGenRootTypes['Product']; // Product!
    updateProductImageBySomeone: NexusGenRootTypes['Product']; // Product!
    updateProductNameByAdmin: NexusGenRootTypes['Product']; // Product!
    updateProductNameByUser: NexusGenRootTypes['Product']; // Product!
    updateProductPriceByAdmin: number; // Int!
    updateProductPriceByUser: number; // Int!
    updateShopDataByUser: NexusGenRootTypes['UserShopData']; // UserShopData!
    updateTaobaoRefreshDayByAdmin: number; // Int!
    updateUserQuestionByAdmin: boolean; // Boolean!
    verifyPhoneByEveryone: number; // Int!
    withdrawByUser: boolean; // Boolean!
  }
  Notice: { // field return type
    attachmentFile: string | null; // String
    content: string; // String!
    contentSummary: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isVisible: boolean; // Boolean!
    title: string; // String!
    viewCount: number; // Int!
  }
  Order: { // field return type
    buyerName: string; // String!
    customId: string; // String!
    deliveryExpiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    isCustomIdValid: boolean | null; // Boolean
    optionName: string; // String!
    orderProductNumber: string; // String!
    orderState: number; // Int!
    orderedAt: NexusGenScalars['DateTime']; // DateTime!
    originalData: string; // String!
    payPrice: number; // Int!
    product: NexusGenRootTypes['Product'] | null; // Product
    productId: number | null; // Int
    productName: string; // String!
    quantity: number; // Int!
    receiverName: string; // String!
    sellerProductCode: string; // String!
    shippingFee: number; // Int!
    state: NexusGenEnums['OrderState']; // OrderState!
    storeProductId: string; // String!
    storeUrl: string | null; // String
    userShopData: NexusGenRootTypes['UserShopData']; // UserShopData!
    userShopDataId: number; // Int!
  }
  PhoneVerification: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    tel: string; // String!
    verificationNumber: string; // String!
  }
  PlanInfo: { // field return type
    description: string; // String!
    externalFeatureVariableId: string | null; // String
    id: number; // Int!
    isActive: boolean; // Boolean!
    month: number; // Int!
    name: string; // String!
    planLevel: number | null; // Int
    price: number; // Int!
  }
  Product: { // field return type
    admin: NexusGenRootTypes['Admin'] | null; // Admin
    adminId: number | null; // Int
    category: NexusGenRootTypes['Category'] | null; // Category
    categoryCode: string | null; // String
    cnyRate: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: number; // Int!
    imageThumbnail: string[]; // [String!]!
    imageThumbnailData: string; // String!
    isImageTranslated: boolean; // Boolean!
    isNameTranslated: boolean; // Boolean!
    localShippingFee: number; // Float!
    marginRate: number; // Float!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    optionInfoHtml: string; // String!
    price: number; // Int!
    productCode: string; // String!
    productOption: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOptionName: NexusGenRootTypes['ProductOptionName'][]; // [ProductOptionName!]!
    productStore: NexusGenRootTypes['ProductStore'][]; // [ProductStore!]!
    shippingFee: number; // Int!
    siilCode: string | null; // String
    siilData: string | null; // String
    siilInfo: NexusGenRootTypes['SiilSavedData'] | null; // SiilSavedData
    state: NexusGenEnums['ProductState']; // ProductState!
    stockUpdatedAt: NexusGenScalars['DateTime']; // DateTime!
    taobaoProduct: NexusGenRootTypes['TaobaoProduct']; // TaobaoProduct!
    taobaoProductId: number; // Int!
    user: NexusGenRootTypes['User'] | null; // User
    userId: number | null; // Int
  }
  ProductOption: { // field return type
    id: number; // Int!
    isActive: boolean; // Boolean!
    name: string; // String!
    optionString: string; // String!
    optionValue1: NexusGenRootTypes['ProductOptionValue']; // ProductOptionValue!
    optionValue1Id: number; // Int!
    optionValue2: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    optionValue2Id: number | null; // Int
    optionValue3: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    optionValue3Id: number | null; // Int
    price: number; // Int!
    priceCny: number; // Float!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    stock: number | null; // Int
    taobaoSkuId: string; // String!
  }
  ProductOptionName: { // field return type
    id: number; // Int!
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    productOptionValue: NexusGenRootTypes['ProductOptionValue'][]; // [ProductOptionValue!]!
    taobaoPid: string; // String!
  }
  ProductOptionValue: { // field return type
    id: number; // Int!
    image: string | null; // String
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    number: number; // Int!
    optionNameOrder: number; // Int!
    productOption: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOption1: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOption2: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOption3: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOptionName: NexusGenRootTypes['ProductOptionName']; // ProductOptionName!
    productOptionNameId: number; // Int!
    taobaoVid: string; // String!
  }
  ProductStore: { // field return type
    etcVendorItemId: string | null; // String
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    productStoreLog: NexusGenRootTypes['ProductStoreLog'][]; // [ProductStoreLog!]!
    productStoreState: NexusGenRootTypes['ProductStoreState']; // ProductStoreState!
    state: number; // Int!
    storeProductId: string | null; // String
    storeUrl: string | null; // String
    userSetData: NexusGenRootTypes['UserSetData'] | null; // UserSetData
    userSetDataId: number | null; // Int
    userShopData: NexusGenRootTypes['UserShopData']; // UserShopData!
    userShopDataId: number; // Int!
  }
  ProductStoreLog: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    destState: number; // Int!
    errorMessage: string; // String!
    id: number; // Int!
    jobId: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    productStore: NexusGenRootTypes['ProductStore']; // ProductStore!
    productStoreId: number; // Int!
    productStoreState: NexusGenRootTypes['ProductStoreState']; // ProductStoreState!
    uploadState: NexusGenEnums['ProductStoreLogUploadState']; // ProductStoreLogUploadState!
  }
  ProductStoreState: { // field return type
    description: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  PurchaseLog: { // field return type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payAmount: number; // Int!
    payId: string | null; // String
    planInfo: string; // String!
    purchasedAt: NexusGenScalars['DateTime']; // DateTime!
    state: NexusGenEnums['PurchaseLogState']; // PurchaseLogState!
    type: NexusGenEnums['PurchaseLogType']; // PurchaseLogType!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Query: { // field return type
    getExcelSampleUrlBySomeone: string; // String!
    getRegisterProductsDataByUser: string; // String!
    getUserSetObjectByUser: NexusGenRootTypes['SetParamType']; // SetParamType!
    searchCategoriesBySomeone: NexusGenRootTypes['Category'][]; // [Category!]!
    selectCategoriesByHierarchicalBySomeone: NexusGenRootTypes['CategorySelectType'][]; // [CategorySelectType!]!
    selectCategoriesBySomeone: NexusGenRootTypes['Category'][]; // [Category!]!
    selectCnyRateByEveryone: number; // Float!
    selectFaqCategoriesByEveryone: NexusGenRootTypes['FaqCategory'][]; // [FaqCategory!]!
    selectFaqCategoryCountByAdmin: number | null; // Int
    selectFaqCountByAdmin: number | null; // Int
    selectFaqsByEveryone: NexusGenRootTypes['Faq'][]; // [Faq!]!
    selectFreeUserDayLimitByAdmin: number; // Int!
    selectFreeUserProductLimitByAdmin: number; // Int!
    selectMyInfoByUser: NexusGenRootTypes['User']; // User!
    selectMyProductByUser: NexusGenRootTypes['Product'][]; // [Product!]!
    selectMyProductsCountByUser: number; // Int!
    selectMySetDataByUser: NexusGenRootTypes['UserSetData'][]; // [UserSetData!]!
    selectMyShopDataByUser: NexusGenRootTypes['UserShopData'][]; // [UserShopData!]!
    selectNoticeByEveryone: NexusGenRootTypes['Notice']; // Notice!
    selectNoticeCountByAdmin: number | null; // Int
    selectNoticesByEveryone: NexusGenRootTypes['Notice'][]; // [Notice!]!
    selectOrdersByUser: NexusGenRootTypes['Order'][]; // [Order!]!
    selectPlanInfosForEveryone: NexusGenRootTypes['PlanInfo'][]; // [PlanInfo!]!
    selectProductsByAdmin: NexusGenRootTypes['Product'][]; // [Product!]!
    selectProductsBySomeone: NexusGenRootTypes['Product'][]; // [Product!]!
    selectProductsCountByAdmin: number | null; // Int
    selectProductsCountBySomeone: number | null; // Int
    selectSetDataByAdmin: NexusGenRootTypes['UserSetData'][]; // [UserSetData!]!
    selectSetDataCountByAdmin: number | null; // Int
    selectShopDataByAdmin: NexusGenRootTypes['UserShopData'][]; // [UserShopData!]!
    selectShopDataCountByAdmin: number | null; // Int
    selectSiilInfoBySomeone: NexusGenRootTypes['SiilItems'][]; // [SiilItems!]!
    selectTaobaoOrdersByAdmin: NexusGenRootTypes['TaobaoOrder'][]; // [TaobaoOrder!]!
    selectTaobaoProductsByAdmin: NexusGenRootTypes['TaobaoProduct'][]; // [TaobaoProduct!]!
    selectTaobaoProductsByUser: NexusGenRootTypes['TaobaoProduct'][]; // [TaobaoProduct!]!
    selectTaobaoProductsCountByAdmin: number | null; // Int
    selectTaobaoRefreshDayByEveryone: number; // Int!
    selectUserQuestionBySomeone: NexusGenRootTypes['UserQuestion'][]; // [UserQuestion!]!
    selectUserQuestionCountBySomeone: number | null; // Int
    selectUsersByAdmin: NexusGenRootTypes['User'][]; // [User!]!
    selectUsersCountByAdmin: number; // Int!
    selectWordTablesBySomeone: NexusGenRootTypes['WordTable'][]; // [WordTable!]!
    t_get: string | null; // String
    t_getEncodedSetInfo: string | null; // String
    translateText: string; // String!
    whoami: string | null; // String
  }
  SetParamType: { // field return type
    encodedSetInfo: string | null; // String
    number: string; // String!
    siteCode: string; // String!
    siteUserId: string; // String!
    siteUserPw: string; // String!
    siteUseretc1: string; // String!
    siteUseretc2: string; // String!
    siteUseretc3: string; // String!
    siteUseretc4: string; // String!
    siteUseretc5: string; // String!
    siteUseretc6: string; // String!
    sol_type: string; // String!
    userCode: string; // String!
  }
  SignInType: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  SiilItem: { // field return type
    code: string; // String!
    inputType: NexusGenEnums['SiilItemTypeEnum']; // SiilItemTypeEnum!
    name: string; // String!
    options: string[] | null; // [String!]
  }
  SiilItems: { // field return type
    data: NexusGenRootTypes['SiilItem'][]; // [SiilItem!]!
    description: string; // String!
  }
  SiilSavedData: { // field return type
    code: string; // String!
    data: NexusGenRootTypes['SiilSavedItem'][]; // [SiilSavedItem!]!
  }
  SiilSavedItem: { // field return type
    code: string; // String!
    value: string; // String!
  }
  Subscription: { // field return type
    subscribeTaobaoOrderQueueEventByAdmin: number; // Int!
    subscribeUserEvent: NexusGenRootTypes['UserLog'] | null; // UserLog
  }
  TaobaoOrder: { // field return type
    buyerMessage: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    logisticCompany: string | null; // String
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    order: NexusGenRootTypes['Order'][]; // [Order!]!
    originalData: string; // String!
    realMoney: number | null; // Float
    state: NexusGenEnums['TaobaoOrderState']; // TaobaoOrderState!
    taobaoId: string; // String!
    taobaoOrderNum: string; // String!
    waybill: string | null; // String
  }
  TaobaoProduct: { // field return type
    brand: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imageThumbnail: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    options: NexusGenRootTypes['TaobaoProductOptionInfo']; // TaobaoProductOptionInfo!
    originalData: string; // String!
    price: number; // Float!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
    taobaoBrandId: string | null; // String
    taobaoCategoryId: string; // String!
    taobaoNumIid: string; // String!
    videoUrl: string | null; // String
  }
  TaobaoProductOption: { // field return type
    name: string; // String!
    taobaoSkuId: string; // String!
  }
  TaobaoProductOptionInfo: { // field return type
    option: NexusGenRootTypes['TaobaoProductOption'][]; // [TaobaoProductOption!]!
    optionName: NexusGenRootTypes['TaobaoProductOptionName'][]; // [TaobaoProductOptionName!]!
    optionValue: NexusGenRootTypes['TaobaoProductOptionValue'][]; // [TaobaoProductOptionValue!]!
  }
  TaobaoProductOptionName: { // field return type
    name: string; // String!
    taobaoPid: string; // String!
  }
  TaobaoProductOptionValue: { // field return type
    image: string | null; // String
    name: string; // String!
    taobaoVid: string; // String!
  }
  User: { // field return type
    companyInfo: NexusGenRootTypes['UserCompanyInfo'] | null; // UserCompanyInfo
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    kakaoId: string | null; // String
    naverId: string | null; // String
    password: string | null; // String
    product: NexusGenRootTypes['Product'][]; // [Product!]!
    productCount: number; // Int!
    purchaseInfo: NexusGenRootTypes['UserPurchaseInfo']; // UserPurchaseInfo!
    state: NexusGenEnums['UserState']; // UserState!
    userInfo: NexusGenRootTypes['UserInfo'] | null; // UserInfo
    userLog: NexusGenRootTypes['UserLog'][]; // [UserLog!]!
    userShopData: NexusGenRootTypes['UserShopData'][]; // [UserShopData!]!
  }
  UserCompanyInfo: { // field return type
    code: string; // String!
    name: string; // String!
    ownerName: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  UserInfo: { // field return type
    additionalShippingFeeJeju: number | null; // Int
    asInformation: string | null; // String
    asTel: string | null; // String
    cnyRate: number; // Float!
    codeFile: string | null; // String
    defaultShippingFee: number; // Int!
    exchangeShippingFee: number | null; // Int
    fixImageBottom: string | null; // String
    fixImageTop: string | null; // String
    marginRate: number; // Float!
    maxProductLimit: number | null; // Int
    phone: string | null; // String
    productCollectCount: number; // Int!
    refundAccountInfo: NexusGenRootTypes['AccountInfo'] | null; // AccountInfo
    refundAccountInfoData: string | null; // String
    refundShippingFee: number | null; // Int
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  UserLog: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isRead: boolean; // Boolean!
    payloadData: string; // String!
    title: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  UserPurchaseAdditionalInfo: { // field return type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['UserPurchaseAdditionalInfoEnumType']; // UserPurchaseAdditionalInfoEnumType!
  }
  UserPurchaseInfo: { // field return type
    additionalInfo: NexusGenRootTypes['UserPurchaseAdditionalInfo'][]; // [UserPurchaseAdditionalInfo!]!
    level: number; // Int!
    levelExpiredAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserQuestion: { // field return type
    answer: string | null; // String
    answeredAt: NexusGenScalars['DateTime'] | null; // DateTime
    attachmentFile: string | null; // String
    attachmentFiles: string[]; // [String!]!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isActive: boolean; // Boolean!
    title: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  UserSetData: { // field return type
    id: number; // Int!
    name: string; // String!
    setFilePath: string; // String!
    userShopData: NexusGenRootTypes['UserShopData']; // UserShopData!
    userShopDataId: number; // Int!
  }
  UserShopData: { // field return type
    id: number; // Int!
    siteCode: string; // String!
    siteUserId: string; // String!
    siteUserPw: string; // String!
    siteUseretc1: string; // String!
    siteUseretc2: string; // String!
    siteUseretc3: string; // String!
    siteUseretc4: string; // String!
    siteUseretc5: string; // String!
    siteUseretc6: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
    userSetData: NexusGenRootTypes['UserSetData'][]; // [UserSetData!]!
  }
  WordTable: { // field return type
    findWord: string; // String!
    id: number; // Int!
    replaceWord: string | null; // String
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AccountInfo: { // field return type name
    accountHolder: 'String'
    accountNumber: 'String'
    bankName: 'String'
  }
  Admin: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    loginId: 'String'
    state: 'AdminState'
  }
  Category: { // field return type name
    a077Code: 'String'
    b378Code: 'Int'
    c1: 'String'
    c1Name: 'String'
    c2: 'String'
    c2Name: 'String'
    c3: 'String'
    c3Name: 'String'
    c4: 'String'
    c4Name: 'String'
    code: 'String'
    id: 'Int'
    siilCode: 'String'
  }
  CategorySelectType: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryStore: { // field return type name
    acode: 'String'
    cateStateCdate: 'DateTime'
    cateStatePdate: 'DateTime'
    ccode: 'String'
    dc1: 'String'
    dc1Name: 'String'
    dc2: 'String'
    dc2Name: 'String'
    dc3: 'String'
    dc3Name: 'String'
    dc4: 'String'
    dc4Name: 'String'
    id: 'Int'
    pcode: 'String'
    state: 'CategoryStoreState'
  }
  Faq: { // field return type name
    FaqCategory: 'FaqCategory'
    categoryId: 'Int'
    content: 'String'
    contentSummary: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    title: 'String'
  }
  FaqCategory: { // field return type name
    faq: 'Faq'
    id: 'Int'
    isActive: 'Boolean'
    name: 'String'
    order: 'Int'
  }
  Mutation: { // field return type name
    addSetDataByUser: 'UserShopData'
    addWordByExcelByUser: 'Boolean'
    addWordByUser: 'Boolean'
    cancelPurchasePlanByUser: 'Boolean'
    changeMyPasswordByAdmin: 'Boolean'
    changeOrderStateByUser: 'String'
    changePasswordByUser: 'Boolean'
    connectSocialIdByUser: 'User'
    createFaqByAdmin: 'Boolean'
    createFaqCategoryByAdmin: 'FaqCategory'
    createNoticeByAdmin: 'Boolean'
    createShopDataByUser: 'UserShopData'
    createUserQuestionByUser: 'Boolean'
    deleteFaqByAdmin: 'Int'
    deleteFaqCategoryByAdmin: 'Boolean'
    deleteNoticeByAdmin: 'Int'
    deleteProductByAdmin: 'Boolean'
    deleteProductByUser: 'Boolean'
    deleteWordByUser: 'Boolean'
    endProductSellStateByAdmin: 'Int'
    endProductSellStateByUser: 'Int'
    getTaobaoItemUsingExcelFileByAdmin: 'Int'
    getTaobaoItemUsingExcelFileByUser: 'Int'
    getTaobaoItemUsingExtensionByUser: 'String'
    getTaobaoItemUsingNumIidsByAdmin: 'Int'
    getTaobaoItemUsingNumIidsByUser: 'Int'
    getTaobaoItemsByAdmin: 'Boolean'
    getTaobaoItemsByUser: 'Boolean'
    invalidatePurchaseInfoByAdmin: 'Boolean'
    modifyFaqCategoryByAdmin: 'FaqCategory'
    modifyWordByUser: 'Boolean'
    purchasePlanByUser: 'Int'
    registerProductByUser: 'String'
    registerProductsByAdmin: 'String'
    registerProductsByUser: 'String'
    renewToken: 'SignInType'
    requestPhoneVerificationByEveryone: 'Boolean'
    scrapOrderByUser: 'String'
    setMaxProductLimitByAdmin: 'Boolean'
    setPurchaseInfoByAdmin: 'Boolean'
    signInAdminByEveryone: 'SignInType'
    signInUserByEveryone: 'SignInType'
    signInUserForImageProgramByEveryone: 'String'
    signUpAdminByAdmin: 'Boolean'
    signUpUserByEveryone: 'SignInType'
    sortFaqCategoryByAdmin: 'Boolean'
    t_createProduct: 'Boolean'
    transferProductsToUserByAdmin: 'String'
    translateProductTextByUser: 'String'
    translateProductsTextByUser: 'String'
    updateCategoryStoreDataByAdmin: 'Boolean'
    updateCnyRateByAdmin: 'Float'
    updateFaqByAdmin: 'Boolean'
    updateFreeUserDayLimitByAdmin: 'Int'
    updateFreeUserProductLimitByAdmin: 'Int'
    updateManyProductCategoryByAdmin: 'Int'
    updateManyProductCategoryByUser: 'Int'
    updateManyProductSiilInfoByAdmin: 'Int'
    updateManyProductSiilInfoByUser: 'Int'
    updateMyDataByUser: 'Boolean'
    updateNoticeByAdmin: 'Boolean'
    updatePhoneByUser: 'Boolean'
    updatePlanInfoByAdmin: 'PlanInfo'
    updateProductByAdmin: 'Product'
    updateProductByUser: 'Product'
    updateProductImageBySomeone: 'Product'
    updateProductNameByAdmin: 'Product'
    updateProductNameByUser: 'Product'
    updateProductPriceByAdmin: 'Int'
    updateProductPriceByUser: 'Int'
    updateShopDataByUser: 'UserShopData'
    updateTaobaoRefreshDayByAdmin: 'Int'
    updateUserQuestionByAdmin: 'Boolean'
    verifyPhoneByEveryone: 'Int'
    withdrawByUser: 'Boolean'
  }
  Notice: { // field return type name
    attachmentFile: 'String'
    content: 'String'
    contentSummary: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isVisible: 'Boolean'
    title: 'String'
    viewCount: 'Int'
  }
  Order: { // field return type name
    buyerName: 'String'
    customId: 'String'
    deliveryExpiredAt: 'DateTime'
    id: 'String'
    isCustomIdValid: 'Boolean'
    optionName: 'String'
    orderProductNumber: 'String'
    orderState: 'Int'
    orderedAt: 'DateTime'
    originalData: 'String'
    payPrice: 'Int'
    product: 'Product'
    productId: 'Int'
    productName: 'String'
    quantity: 'Int'
    receiverName: 'String'
    sellerProductCode: 'String'
    shippingFee: 'Int'
    state: 'OrderState'
    storeProductId: 'String'
    storeUrl: 'String'
    userShopData: 'UserShopData'
    userShopDataId: 'Int'
  }
  PhoneVerification: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    tel: 'String'
    verificationNumber: 'String'
  }
  PlanInfo: { // field return type name
    description: 'String'
    externalFeatureVariableId: 'String'
    id: 'Int'
    isActive: 'Boolean'
    month: 'Int'
    name: 'String'
    planLevel: 'Int'
    price: 'Int'
  }
  Product: { // field return type name
    admin: 'Admin'
    adminId: 'Int'
    category: 'Category'
    categoryCode: 'String'
    cnyRate: 'Float'
    createdAt: 'DateTime'
    description: 'String'
    id: 'Int'
    imageThumbnail: 'String'
    imageThumbnailData: 'String'
    isImageTranslated: 'Boolean'
    isNameTranslated: 'Boolean'
    localShippingFee: 'Float'
    marginRate: 'Float'
    modifiedAt: 'DateTime'
    name: 'String'
    optionInfoHtml: 'String'
    price: 'Int'
    productCode: 'String'
    productOption: 'ProductOption'
    productOptionName: 'ProductOptionName'
    productStore: 'ProductStore'
    shippingFee: 'Int'
    siilCode: 'String'
    siilData: 'String'
    siilInfo: 'SiilSavedData'
    state: 'ProductState'
    stockUpdatedAt: 'DateTime'
    taobaoProduct: 'TaobaoProduct'
    taobaoProductId: 'Int'
    user: 'User'
    userId: 'Int'
  }
  ProductOption: { // field return type name
    id: 'Int'
    isActive: 'Boolean'
    name: 'String'
    optionString: 'String'
    optionValue1: 'ProductOptionValue'
    optionValue1Id: 'Int'
    optionValue2: 'ProductOptionValue'
    optionValue2Id: 'Int'
    optionValue3: 'ProductOptionValue'
    optionValue3Id: 'Int'
    price: 'Int'
    priceCny: 'Float'
    product: 'Product'
    productId: 'Int'
    stock: 'Int'
    taobaoSkuId: 'String'
  }
  ProductOptionName: { // field return type name
    id: 'Int'
    isNameTranslated: 'Boolean'
    name: 'String'
    order: 'Int'
    product: 'Product'
    productId: 'Int'
    productOptionValue: 'ProductOptionValue'
    taobaoPid: 'String'
  }
  ProductOptionValue: { // field return type name
    id: 'Int'
    image: 'String'
    isNameTranslated: 'Boolean'
    name: 'String'
    number: 'Int'
    optionNameOrder: 'Int'
    productOption: 'ProductOption'
    productOption1: 'ProductOption'
    productOption2: 'ProductOption'
    productOption3: 'ProductOption'
    productOptionName: 'ProductOptionName'
    productOptionNameId: 'Int'
    taobaoVid: 'String'
  }
  ProductStore: { // field return type name
    etcVendorItemId: 'String'
    id: 'Int'
    product: 'Product'
    productId: 'Int'
    productStoreLog: 'ProductStoreLog'
    productStoreState: 'ProductStoreState'
    state: 'Int'
    storeProductId: 'String'
    storeUrl: 'String'
    userSetData: 'UserSetData'
    userSetDataId: 'Int'
    userShopData: 'UserShopData'
    userShopDataId: 'Int'
  }
  ProductStoreLog: { // field return type name
    createdAt: 'DateTime'
    destState: 'Int'
    errorMessage: 'String'
    id: 'Int'
    jobId: 'String'
    modifiedAt: 'DateTime'
    productStore: 'ProductStore'
    productStoreId: 'Int'
    productStoreState: 'ProductStoreState'
    uploadState: 'ProductStoreLogUploadState'
  }
  ProductStoreState: { // field return type name
    description: 'String'
    id: 'Int'
    name: 'String'
  }
  PurchaseLog: { // field return type name
    expiredAt: 'DateTime'
    id: 'Int'
    payAmount: 'Int'
    payId: 'String'
    planInfo: 'String'
    purchasedAt: 'DateTime'
    state: 'PurchaseLogState'
    type: 'PurchaseLogType'
    user: 'User'
    userId: 'Int'
  }
  Query: { // field return type name
    getExcelSampleUrlBySomeone: 'String'
    getRegisterProductsDataByUser: 'String'
    getUserSetObjectByUser: 'SetParamType'
    searchCategoriesBySomeone: 'Category'
    selectCategoriesByHierarchicalBySomeone: 'CategorySelectType'
    selectCategoriesBySomeone: 'Category'
    selectCnyRateByEveryone: 'Float'
    selectFaqCategoriesByEveryone: 'FaqCategory'
    selectFaqCategoryCountByAdmin: 'Int'
    selectFaqCountByAdmin: 'Int'
    selectFaqsByEveryone: 'Faq'
    selectFreeUserDayLimitByAdmin: 'Int'
    selectFreeUserProductLimitByAdmin: 'Int'
    selectMyInfoByUser: 'User'
    selectMyProductByUser: 'Product'
    selectMyProductsCountByUser: 'Int'
    selectMySetDataByUser: 'UserSetData'
    selectMyShopDataByUser: 'UserShopData'
    selectNoticeByEveryone: 'Notice'
    selectNoticeCountByAdmin: 'Int'
    selectNoticesByEveryone: 'Notice'
    selectOrdersByUser: 'Order'
    selectPlanInfosForEveryone: 'PlanInfo'
    selectProductsByAdmin: 'Product'
    selectProductsBySomeone: 'Product'
    selectProductsCountByAdmin: 'Int'
    selectProductsCountBySomeone: 'Int'
    selectSetDataByAdmin: 'UserSetData'
    selectSetDataCountByAdmin: 'Int'
    selectShopDataByAdmin: 'UserShopData'
    selectShopDataCountByAdmin: 'Int'
    selectSiilInfoBySomeone: 'SiilItems'
    selectTaobaoOrdersByAdmin: 'TaobaoOrder'
    selectTaobaoProductsByAdmin: 'TaobaoProduct'
    selectTaobaoProductsByUser: 'TaobaoProduct'
    selectTaobaoProductsCountByAdmin: 'Int'
    selectTaobaoRefreshDayByEveryone: 'Int'
    selectUserQuestionBySomeone: 'UserQuestion'
    selectUserQuestionCountBySomeone: 'Int'
    selectUsersByAdmin: 'User'
    selectUsersCountByAdmin: 'Int'
    selectWordTablesBySomeone: 'WordTable'
    t_get: 'String'
    t_getEncodedSetInfo: 'String'
    translateText: 'String'
    whoami: 'String'
  }
  SetParamType: { // field return type name
    encodedSetInfo: 'String'
    number: 'String'
    siteCode: 'String'
    siteUserId: 'String'
    siteUserPw: 'String'
    siteUseretc1: 'String'
    siteUseretc2: 'String'
    siteUseretc3: 'String'
    siteUseretc4: 'String'
    siteUseretc5: 'String'
    siteUseretc6: 'String'
    sol_type: 'String'
    userCode: 'String'
  }
  SignInType: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  SiilItem: { // field return type name
    code: 'String'
    inputType: 'SiilItemTypeEnum'
    name: 'String'
    options: 'String'
  }
  SiilItems: { // field return type name
    data: 'SiilItem'
    description: 'String'
  }
  SiilSavedData: { // field return type name
    code: 'String'
    data: 'SiilSavedItem'
  }
  SiilSavedItem: { // field return type name
    code: 'String'
    value: 'String'
  }
  Subscription: { // field return type name
    subscribeTaobaoOrderQueueEventByAdmin: 'Int'
    subscribeUserEvent: 'UserLog'
  }
  TaobaoOrder: { // field return type name
    buyerMessage: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    logisticCompany: 'String'
    modifiedAt: 'DateTime'
    order: 'Order'
    originalData: 'String'
    realMoney: 'Float'
    state: 'TaobaoOrderState'
    taobaoId: 'String'
    taobaoOrderNum: 'String'
    waybill: 'String'
  }
  TaobaoProduct: { // field return type name
    brand: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    imageThumbnail: 'String'
    modifiedAt: 'DateTime'
    name: 'String'
    options: 'TaobaoProductOptionInfo'
    originalData: 'String'
    price: 'Float'
    product: 'Product'
    taobaoBrandId: 'String'
    taobaoCategoryId: 'String'
    taobaoNumIid: 'String'
    videoUrl: 'String'
  }
  TaobaoProductOption: { // field return type name
    name: 'String'
    taobaoSkuId: 'String'
  }
  TaobaoProductOptionInfo: { // field return type name
    option: 'TaobaoProductOption'
    optionName: 'TaobaoProductOptionName'
    optionValue: 'TaobaoProductOptionValue'
  }
  TaobaoProductOptionName: { // field return type name
    name: 'String'
    taobaoPid: 'String'
  }
  TaobaoProductOptionValue: { // field return type name
    image: 'String'
    name: 'String'
    taobaoVid: 'String'
  }
  User: { // field return type name
    companyInfo: 'UserCompanyInfo'
    createdAt: 'DateTime'
    email: 'String'
    id: 'Int'
    kakaoId: 'String'
    naverId: 'String'
    password: 'String'
    product: 'Product'
    productCount: 'Int'
    purchaseInfo: 'UserPurchaseInfo'
    state: 'UserState'
    userInfo: 'UserInfo'
    userLog: 'UserLog'
    userShopData: 'UserShopData'
  }
  UserCompanyInfo: { // field return type name
    code: 'String'
    name: 'String'
    ownerName: 'String'
    user: 'User'
    userId: 'Int'
  }
  UserInfo: { // field return type name
    additionalShippingFeeJeju: 'Int'
    asInformation: 'String'
    asTel: 'String'
    cnyRate: 'Float'
    codeFile: 'String'
    defaultShippingFee: 'Int'
    exchangeShippingFee: 'Int'
    fixImageBottom: 'String'
    fixImageTop: 'String'
    marginRate: 'Float'
    maxProductLimit: 'Int'
    phone: 'String'
    productCollectCount: 'Int'
    refundAccountInfo: 'AccountInfo'
    refundAccountInfoData: 'String'
    refundShippingFee: 'Int'
    user: 'User'
    userId: 'Int'
  }
  UserLog: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    isRead: 'Boolean'
    payloadData: 'String'
    title: 'String'
    user: 'User'
    userId: 'Int'
  }
  UserPurchaseAdditionalInfo: { // field return type name
    expiredAt: 'DateTime'
    type: 'UserPurchaseAdditionalInfoEnumType'
  }
  UserPurchaseInfo: { // field return type name
    additionalInfo: 'UserPurchaseAdditionalInfo'
    level: 'Int'
    levelExpiredAt: 'DateTime'
  }
  UserQuestion: { // field return type name
    answer: 'String'
    answeredAt: 'DateTime'
    attachmentFile: 'String'
    attachmentFiles: 'String'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isActive: 'Boolean'
    title: 'String'
    user: 'User'
    userId: 'Int'
  }
  UserSetData: { // field return type name
    id: 'Int'
    name: 'String'
    setFilePath: 'String'
    userShopData: 'UserShopData'
    userShopDataId: 'Int'
  }
  UserShopData: { // field return type name
    id: 'Int'
    siteCode: 'String'
    siteUserId: 'String'
    siteUserPw: 'String'
    siteUseretc1: 'String'
    siteUseretc2: 'String'
    siteUseretc3: 'String'
    siteUseretc4: 'String'
    siteUseretc5: 'String'
    siteUseretc6: 'String'
    user: 'User'
    userId: 'Int'
    userSetData: 'UserSetData'
  }
  WordTable: { // field return type name
    findWord: 'String'
    id: 'Int'
    replaceWord: 'String'
    user: 'User'
    userId: 'Int'
  }
}

export interface NexusGenArgTypes {
  Faq: {
    contentSummary: { // args
      wordCount?: number | null; // Int
    }
  }
  FaqCategory: {
    faq: { // args
      cursor?: NexusGenInputs['FaqWhereUniqueInput'] | null; // FaqWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  Mutation: {
    addSetDataByUser: { // args
      siteCode: string; // String!
      siteUserId: string; // String!
      siteUserPw: string; // String!
      siteUseretc1: string; // String!
      siteUseretc2: string; // String!
      siteUseretc3: string; // String!
      siteUseretc4: string; // String!
      siteUseretc5: string; // String!
      siteUseretc6: string; // String!
    }
    addWordByExcelByUser: { // args
      data: NexusGenScalars['Upload']; // Upload!
      isReplace: boolean; // Boolean!
    }
    addWordByUser: { // args
      findWord: string; // String!
      replaceWord?: string | null; // String
    }
    cancelPurchasePlanByUser: { // args
      merchantUid: string; // String!
    }
    changeMyPasswordByAdmin: { // args
      currentPassword: string; // String!
      newPassword: string; // String!
    }
    changeOrderStateByUser: { // args
      destState: NexusGenEnums['OrderState']; // OrderState!
      orderIds: string[]; // [String!]!
    }
    changePasswordByUser: { // args
      currentPassword: string; // String!
      newPassword: string; // String!
    }
    connectSocialIdByUser: { // args
      socialId: string; // String!
      userType: NexusGenEnums['UserSocialType']; // UserSocialType!
    }
    createFaqByAdmin: { // args
      content: string; // String!
      faqCategoryId: number; // Int!
      title: string; // String!
    }
    createFaqCategoryByAdmin: { // args
      name: string; // String!
    }
    createNoticeByAdmin: { // args
      attachment?: NexusGenScalars['Upload'] | null; // Upload
      content: string; // String!
      title: string; // String!
    }
    createShopDataByUser: { // args
      siteCode: string; // String!
      siteUserId: string; // String!
      siteUserPw: string; // String!
      siteUseretc1: string; // String!
      siteUseretc2: string; // String!
      siteUseretc3: string; // String!
      siteUseretc4: string; // String!
      siteUseretc5: string; // String!
      siteUseretc6: string; // String!
    }
    createUserQuestionByUser: { // args
      attachment?: NexusGenScalars['Upload'][] | null; // [Upload!]
      content: string; // String!
      title: string; // String!
    }
    deleteFaqByAdmin: { // args
      faqIds: number[]; // [Int!]!
    }
    deleteFaqCategoryByAdmin: { // args
      faqCategoryId: number; // Int!
    }
    deleteNoticeByAdmin: { // args
      noticeIds: number[]; // [Int!]!
    }
    deleteProductByAdmin: { // args
      productId: number; // Int!
    }
    deleteProductByUser: { // args
      productId: number; // Int!
    }
    deleteWordByUser: { // args
      wordId: number; // Int!
    }
    endProductSellStateByAdmin: { // args
      productIds: number[]; // [Int!]!
    }
    endProductSellStateByUser: { // args
      productIds: number[]; // [Int!]!
    }
    getTaobaoItemUsingExcelFileByAdmin: { // args
      categoryCode?: string | null; // String
      data: NexusGenScalars['Upload']; // Upload!
      siilCode?: string | null; // String
      userId?: number | null; // Int
    }
    getTaobaoItemUsingExcelFileByUser: { // args
      categoryCode?: string | null; // String
      data: NexusGenScalars['Upload']; // Upload!
      siilCode?: string | null; // String
    }
    getTaobaoItemUsingExtensionByUser: { // args
      data: string; // String!
    }
    getTaobaoItemUsingNumIidsByAdmin: { // args
      categoryCode?: string | null; // String
      siilCode?: string | null; // String
      taobaoIds: string[]; // [String!]!
      userId?: number | null; // Int
    }
    getTaobaoItemUsingNumIidsByUser: { // args
      categoryCode?: string | null; // String
      siilCode?: string | null; // String
      taobaoIds: string[]; // [String!]!
    }
    getTaobaoItemsByAdmin: { // args
      categoryCode?: string | null; // String
      endPrice?: number | null; // Float
      orderBy: NexusGenEnums['TaobaoItemOrderBy']; // TaobaoItemOrderBy!
      page: number | null; // Int
      pageCount: number | null; // Int
      query: string; // String!
      siilCode?: string | null; // String
      startPrice?: number | null; // Float
      userId?: number | null; // Int
    }
    getTaobaoItemsByUser: { // args
      categoryCode?: string | null; // String
      endPrice?: number | null; // Float
      orderBy: NexusGenEnums['TaobaoItemOrderBy']; // TaobaoItemOrderBy!
      page: number | null; // Int
      pageCount: number | null; // Int
      query: string; // String!
      siilCode?: string | null; // String
      startPrice?: number | null; // Float
    }
    invalidatePurchaseInfoByAdmin: { // args
      purchaseLogId: number; // Int!
    }
    modifyFaqCategoryByAdmin: { // args
      faqCategoryId: number; // Int!
      isActive?: boolean | null; // Boolean
      name?: string | null; // String
    }
    modifyWordByUser: { // args
      findWord: string; // String!
      replaceWord?: string | null; // String
      wordId: number; // Int!
    }
    purchasePlanByUser: { // args
      merchantUid: string; // String!
      planInfoId: number; // Int!
    }
    registerProductByUser: { // args
      productIds: number[]; // [Int!]!
      setDataId: number; // Int!
    }
    registerProductsByAdmin: { // args
      productIds: number[]; // [Int!]!
      setDataIds: number[]; // [Int!]!
    }
    registerProductsByUser: { // args
      productIds: number[]; // [Int!]!
      setDataIds: number[]; // [Int!]!
    }
    renewToken: { // args
      accessToken: string; // String!
      refreshToken: string; // String!
    }
    requestPhoneVerificationByEveryone: { // args
      phoneNumber: string; // String!
    }
    scrapOrderByUser: { // args
      collectNewOrder: boolean; // Boolean!
      shopDataId: number; // Int!
    }
    setMaxProductLimitByAdmin: { // args
      productLimit?: number | null; // Int
      userId: number; // Int!
    }
    setPurchaseInfoByAdmin: { // args
      planInfoId: number; // Int!
      userId: number; // Int!
    }
    signInAdminByEveryone: { // args
      id: string; // String!
      password: string; // String!
    }
    signInUserByEveryone: { // args
      email: string; // String!
      password: string; // String!
      userType: NexusGenEnums['UserSocialType']; // UserSocialType!
    }
    signInUserForImageProgramByEveryone: { // args
      email: string; // String!
      password: string; // String!
      userType: NexusGenEnums['UserLoginType']; // UserLoginType!
    }
    signUpAdminByAdmin: { // args
      id: string; // String!
      password: string; // String!
    }
    signUpUserByEveryone: { // args
      email: string; // String!
      password: string; // String!
      phone: string; // String!
      verificationId: number; // Int!
    }
    sortFaqCategoryByAdmin: { // args
      faqCategoryIds: number[]; // [Int!]!
    }
    transferProductsToUserByAdmin: { // args
      productIds: number[]; // [Int!]!
      targetUserId: number; // Int!
    }
    translateProductTextByUser: { // args
      id: number; // Int!
      type: NexusGenEnums['TranslateTargetEnumType']; // TranslateTargetEnumType!
    }
    translateProductsTextByUser: { // args
      ids: number[]; // [Int!]!
      type: NexusGenEnums['TranslateTargetEnumType']; // TranslateTargetEnumType!
    }
    updateCnyRateByAdmin: { // args
      cnyRate: number; // Float!
    }
    updateFaqByAdmin: { // args
      content?: string | null; // String
      faqCategoryId?: number | null; // Int
      faqId: number; // Int!
      title?: string | null; // String
    }
    updateFreeUserDayLimitByAdmin: { // args
      day: number; // Int!
    }
    updateFreeUserProductLimitByAdmin: { // args
      day: number; // Int!
    }
    updateManyProductCategoryByAdmin: { // args
      categoryCode: string; // String!
      productIds: number[]; // [Int!]!
    }
    updateManyProductCategoryByUser: { // args
      categoryCode: string; // String!
      productIds: number[]; // [Int!]!
    }
    updateManyProductSiilInfoByAdmin: { // args
      productIds: number[]; // [Int!]!
      siilCode: string; // String!
    }
    updateManyProductSiilInfoByUser: { // args
      productIds: number[]; // [Int!]!
      siilCode: string; // String!
    }
    updateMyDataByUser: { // args
      additionalShippingFeeJeju?: number | null; // Int
      asInformation?: string | null; // String
      asTel?: string | null; // String
      cnyRate?: number | null; // Float
      companyFile?: NexusGenScalars['Upload'] | null; // Upload
      companyInfo?: NexusGenInputs['UserCompanyInfoInput'] | null; // UserCompanyInfoInput
      defaultShippingFee?: number | null; // Int
      exchangeShippingFee?: number | null; // Int
      fixImageBottom?: NexusGenScalars['Upload'] | null; // Upload
      fixImageTop?: NexusGenScalars['Upload'] | null; // Upload
      isPersonal?: boolean | null; // Boolean
      marginRate?: number | null; // Float
      refundAccountInfoData?: NexusGenInputs['AccountInfoInput'] | null; // AccountInfoInput
      refundShippingFee?: number | null; // Int
    }
    updateNoticeByAdmin: { // args
      attachment?: NexusGenScalars['Upload'] | null; // Upload
      content?: string | null; // String
      noticeId: number; // Int!
      title?: string | null; // String
    }
    updatePhoneByUser: { // args
      phone: string; // String!
      verificationId: number; // Int!
    }
    updatePlanInfoByAdmin: { // args
      description?: string | null; // String
      isActive?: boolean | null; // Boolean
      name?: string | null; // String
      planId: number; // Int!
      price?: number | null; // Int
    }
    updateProductByAdmin: { // args
      categoryCode?: string | null; // String
      description?: string | null; // String
      localShippingFee?: number | null; // Float
      name?: string | null; // String
      optionNames: NexusGenInputs['ProductOptionNameUpdateInput'][]; // [ProductOptionNameUpdateInput!]!
      optionValues: NexusGenInputs['ProductOptionValueUpdateInput'][]; // [ProductOptionValueUpdateInput!]!
      options: NexusGenInputs['ProductOptionUpdateInput'][]; // [ProductOptionUpdateInput!]!
      price?: number | null; // Int
      productId: number; // Int!
      siilCode?: string | null; // String
      siilData?: NexusGenInputs['SiilInput'][] | null; // [SiilInput!]
      thumbnails?: NexusGenInputs['ProductThumbnailUpdateInput'][] | null; // [ProductThumbnailUpdateInput!]
    }
    updateProductByUser: { // args
      categoryCode?: string | null; // String
      description?: string | null; // String
      localShippingFee?: number | null; // Float
      name?: string | null; // String
      optionNames: NexusGenInputs['ProductOptionNameUpdateInput'][]; // [ProductOptionNameUpdateInput!]!
      optionValues: NexusGenInputs['ProductOptionValueUpdateInput'][]; // [ProductOptionValueUpdateInput!]!
      options: NexusGenInputs['ProductOptionUpdateInput'][]; // [ProductOptionUpdateInput!]!
      price?: number | null; // Int
      productId: number; // Int!
      siilCode?: string | null; // String
      siilData?: NexusGenInputs['SiilInput'][] | null; // [SiilInput!]
      thumbnails?: NexusGenInputs['ProductThumbnailUpdateInput'][] | null; // [ProductThumbnailUpdateInput!]
    }
    updateProductImageBySomeone: { // args
      description?: string | null; // String
      optionValues: NexusGenInputs['ProductOptionValueImageUpdateInput'][]; // [ProductOptionValueImageUpdateInput!]!
      productId: number; // Int!
      thumbnails?: NexusGenInputs['ProductThumbnailImageUpdateInput'][] | null; // [ProductThumbnailImageUpdateInput!]
    }
    updateProductNameByAdmin: { // args
      name: string; // String!
      productId: number; // Int!
    }
    updateProductNameByUser: { // args
      name: string; // String!
      productId: number; // Int!
    }
    updateProductPriceByAdmin: { // args
      cnyRate: number; // Float!
      marginRate: number; // Float!
      productIds: number[]; // [Int!]!
      shippingFee: number; // Int!
    }
    updateProductPriceByUser: { // args
      cnyRate: number; // Float!
      marginRate: number; // Float!
      productIds: number[]; // [Int!]!
      shippingFee: number; // Int!
    }
    updateShopDataByUser: { // args
      siteUserId?: string | null; // String
      siteUserPw?: string | null; // String
      siteUseretc1?: string | null; // String
      siteUseretc2?: string | null; // String
      siteUseretc3?: string | null; // String
      siteUseretc4?: string | null; // String
      siteUseretc5?: string | null; // String
      siteUseretc6?: string | null; // String
      userShopDataId: number; // Int!
    }
    updateTaobaoRefreshDayByAdmin: { // args
      day: number; // Int!
    }
    updateUserQuestionByAdmin: { // args
      answer: string; // String!
      userQuestionId: number; // Int!
    }
    verifyPhoneByEveryone: { // args
      phoneNumber: string; // String!
      verificationNumber: string; // String!
    }
  }
  Notice: {
    contentSummary: { // args
      wordCount?: number | null; // Int
    }
  }
  Product: {
    productOption: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOptionName: { // args
      cursor?: NexusGenInputs['ProductOptionNameWhereUniqueInput'] | null; // ProductOptionNameWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionNameOrderByWithRelationInput'][] | null; // [ProductOptionNameOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    }
    productStore: { // args
      cursor?: NexusGenInputs['ProductStoreWhereUniqueInput'] | null; // ProductStoreWhereUniqueInput
      orderBy?: NexusGenInputs['ProductStoreOrderByWithRelationInput'][] | null; // [ProductStoreOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    }
  }
  ProductOptionName: {
    productOptionValue: { // args
      cursor?: NexusGenInputs['ProductOptionValueWhereUniqueInput'] | null; // ProductOptionValueWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'][] | null; // [ProductOptionValueOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    }
  }
  ProductOptionValue: {
    productOption: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: Array<NexusGenInputs['ProductOptionOrderByWithRelationInput'] | null> | null; // [ProductOptionOrderByWithRelationInput]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOption1: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOption2: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOption3: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
  }
  ProductStore: {
    productStoreLog: { // args
      cursor?: NexusGenInputs['ProductStoreLogWhereUniqueInput'] | null; // ProductStoreLogWhereUniqueInput
      orderBy?: NexusGenInputs['ProductStoreLogOrderByWithRelationInput'][] | null; // [ProductStoreLogOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    }
  }
  Query: {
    getExcelSampleUrlBySomeone: { // args
      type: NexusGenEnums['ExcelSampleEnum']; // ExcelSampleEnum!
    }
    getRegisterProductsDataByUser: { // args
      productIds: number[]; // [Int!]!
      userShopDataId: number; // Int!
    }
    getUserSetObjectByUser: { // args
      userSetDataId?: number | null; // Int
      userShopDataId?: number | null; // Int
    }
    searchCategoriesBySomeone: { // args
      keyword: string; // String!
    }
    selectCategoriesByHierarchicalBySomeone: { // args
      code?: string | null; // String
    }
    selectCategoriesBySomeone: { // args
      cursor?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      orderBy?: NexusGenInputs['CategoryOrderByWithRelationInput'][] | null; // [CategoryOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    }
    selectFaqCategoriesByEveryone: { // args
      cursor?: NexusGenInputs['FaqCategoryWhereUniqueInput'] | null; // FaqCategoryWhereUniqueInput
      orderBy?: NexusGenInputs['FaqCategoryOrderByWithRelationInput'][] | null; // [FaqCategoryOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['FaqCategoryWhereInput'] | null; // FaqCategoryWhereInput
    }
    selectFaqCategoryCountByAdmin: { // args
      where?: NexusGenInputs['FaqCategoryWhereInput'] | null; // FaqCategoryWhereInput
    }
    selectFaqCountByAdmin: { // args
      where?: NexusGenInputs['FaqWhereInput'] | null; // FaqWhereInput
    }
    selectFaqsByEveryone: { // args
      cursor?: NexusGenInputs['FaqWhereUniqueInput'] | null; // FaqWhereUniqueInput
      orderBy?: NexusGenInputs['FaqOrderByWithRelationInput'][] | null; // [FaqOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['FaqWhereInput'] | null; // FaqWhereInput
    }
    selectMyProductByUser: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectMyProductsCountByUser: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectMySetDataByUser: { // args
      cursor?: NexusGenInputs['UserSetDataWhereUniqueInput'] | null; // UserSetDataWhereUniqueInput
      orderBy?: NexusGenInputs['UserSetDataOrderByWithRelationInput'][] | null; // [UserSetDataOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    }
    selectMyShopDataByUser: { // args
      cursor?: NexusGenInputs['UserShopDataWhereUniqueInput'] | null; // UserShopDataWhereUniqueInput
      orderBy?: NexusGenInputs['UserShopDataOrderByWithRelationInput'][] | null; // [UserShopDataOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    }
    selectNoticeByEveryone: { // args
      noticeId: number; // Int!
    }
    selectNoticeCountByAdmin: { // args
      where?: NexusGenInputs['NoticeWhereInput'] | null; // NoticeWhereInput
    }
    selectNoticesByEveryone: { // args
      cursor?: NexusGenInputs['NoticeWhereUniqueInput'] | null; // NoticeWhereUniqueInput
      orderBy?: NexusGenInputs['NoticeOrderByWithRelationInput'][] | null; // [NoticeOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['NoticeWhereInput'] | null; // NoticeWhereInput
    }
    selectOrdersByUser: { // args
      cursor?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      orderBy?: NexusGenInputs['OrderOrderByWithRelationInput'][] | null; // [OrderOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['OrderWhereInput'] | null; // OrderWhereInput
    }
    selectPlanInfosForEveryone: { // args
      cursor?: NexusGenInputs['PlanInfoWhereUniqueInput'] | null; // PlanInfoWhereUniqueInput
      orderBy?: NexusGenInputs['PlanInfoOrderByWithRelationInput'][] | null; // [PlanInfoOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['PlanInfoWhereInput'] | null; // PlanInfoWhereInput
    }
    selectProductsByAdmin: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsBySomeone: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsCountByAdmin: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsCountBySomeone: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectSetDataByAdmin: { // args
      cursor?: NexusGenInputs['UserSetDataWhereUniqueInput'] | null; // UserSetDataWhereUniqueInput
      orderBy?: NexusGenInputs['UserSetDataOrderByWithRelationInput'][] | null; // [UserSetDataOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    }
    selectSetDataCountByAdmin: { // args
      where?: NexusGenInputs['UserSetDataWhereInput'] | null; // UserSetDataWhereInput
    }
    selectShopDataByAdmin: { // args
      cursor?: NexusGenInputs['UserShopDataWhereUniqueInput'] | null; // UserShopDataWhereUniqueInput
      orderBy?: NexusGenInputs['UserShopDataOrderByWithRelationInput'][] | null; // [UserShopDataOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    }
    selectShopDataCountByAdmin: { // args
      where?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    }
    selectSiilInfoBySomeone: { // args
      code: string; // String!
    }
    selectTaobaoOrdersByAdmin: { // args
      cursor?: NexusGenInputs['TaobaoOrderWhereUniqueInput'] | null; // TaobaoOrderWhereUniqueInput
      orderBy?: NexusGenInputs['TaobaoOrderOrderByWithRelationInput'][] | null; // [TaobaoOrderOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['TaobaoOrderWhereInput'] | null; // TaobaoOrderWhereInput
    }
    selectTaobaoProductsByAdmin: { // args
      cursor?: NexusGenInputs['TaobaoProductWhereUniqueInput'] | null; // TaobaoProductWhereUniqueInput
      orderBy?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'][] | null; // [TaobaoProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectTaobaoProductsByUser: { // args
      cursor?: NexusGenInputs['TaobaoProductWhereUniqueInput'] | null; // TaobaoProductWhereUniqueInput
      orderBy?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'][] | null; // [TaobaoProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectTaobaoProductsCountByAdmin: { // args
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectUserQuestionBySomeone: { // args
      cursor?: NexusGenInputs['UserQuestionWhereUniqueInput'] | null; // UserQuestionWhereUniqueInput
      orderBy?: NexusGenInputs['UserQuestionOrderByWithRelationInput'][] | null; // [UserQuestionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    }
    selectUserQuestionCountBySomeone: { // args
      where?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    }
    selectUsersByAdmin: { // args
      cursor?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      orderBy?: NexusGenInputs['UserOrderByWithRelationInput'][] | null; // [UserOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    selectUsersCountByAdmin: { // args
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    selectWordTablesBySomeone: { // args
      cursor?: NexusGenInputs['WordTableWhereUniqueInput'] | null; // WordTableWhereUniqueInput
      orderBy?: NexusGenInputs['WordTableOrderByWithRelationInput'][] | null; // [WordTableOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    }
    translateText: { // args
      engine: NexusGenEnums['TranslateEngineEnumType']; // TranslateEngineEnumType!
      text: string; // String!
    }
  }
  TaobaoOrder: {
    order: { // args
      cursor?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  TaobaoProduct: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  User: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    userLog: { // args
      cursor?: NexusGenInputs['UserLogWhereUniqueInput'] | null; // UserLogWhereUniqueInput
      orderBy?: NexusGenInputs['UserLogOrderByWithRelationInput'][] | null; // [UserLogOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    }
    userShopData: { // args
      cursor?: NexusGenInputs['UserShopDataWhereUniqueInput'] | null; // UserShopDataWhereUniqueInput
      orderBy?: NexusGenInputs['UserShopDataOrderByWithRelationInput'][] | null; // [UserShopDataOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserShopDataWhereInput'] | null; // UserShopDataWhereInput
    }
  }
  UserShopData: {
    userSetData: { // args
      cursor?: NexusGenInputs['UserSetDataWhereUniqueInput'] | null; // UserSetDataWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}