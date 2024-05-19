import { atom } from "jotai";

const currencyAtom = atom<number>(0.00);
const currenyFormattedAtom = atom<number>((get) => {
    const currency = get(currencyAtom);

    return currency;
});

export { currencyAtom, currenyFormattedAtom };