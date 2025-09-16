import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../layout/main";

export default function CreateShortUrl(){
    const { data: session, status } = useSession();
    const router = useRouter();

    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.replace("/user/signin?callbackUrl=/url/create");
        }
    }, [session, status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setShortUrl(null);

        try {
            const response = await fetch('/api/shorter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ original: originalUrl }),
            });

            const data = await response.json() as { shorter?: string; error?: string };
            const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL === undefined ? 'https://urls.varius.technology' : process.env.NEXT_PUBLIC_HOST_URL;
            if (response.ok) {
                setShortUrl(`${HOST_URL}/api/redirect?id=${data.shorter}` || '');
                setOriginalUrl(""); // Clear the input after successful creation
            } else {
                setError(data.error || 'Failed to create short URL');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (shortUrl) {
            try {
                await navigator.clipboard.writeText(shortUrl);
                alert('URL copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
            }
        }
    };

    if (status === "loading") {
        return <Layout><div>Checking authentication...</div></Layout>;
    }

    if (!session) {
        return null; // Redirect handled by useEffect
    }

    return (
        <Layout>
            <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
                
                <h2>Create Short URL</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        placeholder="Enter original URL"
                        value={originalUrl}
                        onChange={e => setOriginalUrl(e.target.value)}
                        required
                        style={{ width: "100%", padding: 8, marginBottom: 12 }}
                    />
                    <button type="submit" disabled={loading} style={{ width: "100%", padding: 8 }}>
                        {loading ? "Creating..." : "Create Short URL"}
                    </button>
                </form>
                {shortUrl && (
                    <div style={{ marginTop: 16, padding: 12, borderRadius: 4 }}>
                        <strong>Short URL endpoint:</strong> 
                        <div style={{ marginTop: 8 }}>
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#2196F3" }}>
                                {shortUrl}
                            </a>
                        </div>
                        <button 
                            onClick={handleCopy}
                            style={{ marginTop: 8, background: "#4CAF50", color: "#fff", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
                        >
                            Copy URL
                        </button>
                    </div>
                )}
                {error && (
                    <div style={{ marginTop: 16, padding: 12, backgroundColor: "#ffebee", borderRadius: 4, color: "#d32f2f" }}>
                        {error}
                    </div>
                )}
            </div>
        </Layout>
    );
}
