// place files you want to import through the `$lib` alias in this folder.

export const SOCIAL_LINKS = {
	email: 'peaceorefejo@gmail.com',
	github: 'https://github.com/peace-orefejo',
	linkedin: 'https://linkedin.com/in/peace-orefejo'
};

export function linkLabel(url: string, fallback = 'live') {
	try {
		const host = new URL(url).hostname.replace(/^www\./, '');
		if (host === 'pypi.org') return 'PyPI';
		if (host === 'github.com') return 'github';
		if (host === 'npmjs.com') return 'npm';
	} catch {}
	return fallback;
}
