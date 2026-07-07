import Header from "./Header";
import { getCategories } from "@/lib/getCategories";

export default async function HeaderServer() {

    const categories = await getCategories();

    return (
        <Header />
    );

}