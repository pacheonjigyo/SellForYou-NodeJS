import { objectType, unionType } from "nexus";

export const t_Category = objectType({
    name: "Category",
    definition(t) {
        t.model.id();
        t.model.code();
        t.model.c1();
        t.model.c2();
        t.model.c3();
        t.model.c4();
        t.model.c1Name();
        t.model.c2Name();
        t.model.c3Name();
        t.model.c4Name();
        t.model.siilCode();
        t.model.a077Code();
        t.model.b378Code();
    }
});

export const t_CategoryStore = objectType({
    name: "CategoryStore",
    definition(t) {
        t.model.id();
        t.model.acode();
        t.model.pcode();
        t.model.ccode();
        t.model.dc1();
        t.model.dc2();
        t.model.dc3();
        t.model.dc4();
        t.model.dc1Name();
        t.model.dc2Name();
        t.model.dc3Name();
        t.model.dc4Name();
        t.model.state();
        t.model.cateStatePdate();
        t.model.cateStateCdate();
    }
});

export const t_CategoryPartialType = objectType({
    name: "CategorySelectType",
    definition(t) {
        t.nonNull.string("code");
        t.nonNull.string("name");
    }
});
