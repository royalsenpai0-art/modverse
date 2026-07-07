type AnimeCardProps = {
    title: string;
    episode: string;
    image: string;
};

export default function AnimeCard({
    title,
    episode,
    image,
}: AnimeCardProps) {
    return (
        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-purple-500">
            <img
                src={image}
                alt={title}
                className="w-full aspect-[2/3] object-cover"
            />

            <div className="p-2">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                    {title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                    {episode}
                </p>
            </div>
        </div>
    );
}