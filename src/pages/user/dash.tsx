import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteUrl } from "../../utils/deleteUrl";
import { sql } from "../../lib/db";
import Layout from "../layout/main";

export default function Home({ data }) {
    const router = useRouter();
    router.query.callback && router.replace(router.query.callback as string);
    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this URL?');
        if (confirmed) {
            const success = await deleteUrl(id);
            if (success) {
                // Refresh the page to show updated data
                router.reload();
            } else {
                alert('Failed to delete URL. Please try again.');
            }
        }
    };

    return (
        <Layout>
            URL List
            <p>Your one-stop solution for all things Next.js</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h2>URL List</h2>
            <Button h={8} mb={4} p={1} onClick={() => router.push('/url/create')}>
                + Add New URL
            </Button>
            <ul>
                {data.map(url => (
                    <li key={url.id}>
                        <a href={url.target} target="_blank" rel="noopener noreferrer">{url.id} - {url.target}</a>
                        <Button onClick={() => handleDelete(url.id)} colorScheme="red" size="sm" ml={2}>
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export async function getServerSideProps() {
    const data = await sql`SELECT id, original FROM urls ORDER BY created_at DESC`;
    const dataFiltered = data.map(({ id, original }) => ({ id, target: original }));
    return {
        props: {
            data: JSON.parse(JSON.stringify(dataFiltered))
        }
    }
}