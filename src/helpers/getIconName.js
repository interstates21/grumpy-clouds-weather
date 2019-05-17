export default function getIconName(conditions) {
    switch (conditions.toLowerCase()) {
        case "clouds":
            return "cloud";
        case "clear":
            return "soccer-ball-o";
        case "rain":
            return "shower";
        case "drizzle":
			return "coffee";
		case "snow":
			return "snowflake-o"
		case "partly-cloudy-day":
			return "soccer-ball-o"
		case "clear-day":
			return "soccer-ball-o"
		case "wind":
			return "ship"
        default:
            return "meh-o";
    }
}
