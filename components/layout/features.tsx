import React from 'react';

export function Features() {
  const features = [
    {
      title: 'Keyword Tracking',
      description:
        'Monitor your keyword rankings in real-time and track your SEO performance across search engines.',
    },
    {
      title: 'Analytics Dashboard',
      description:
        'Get comprehensive insights with detailed analytics and visual reports on your SEO metrics.',
    },
    {
      title: 'API Access',
      description:
        'Integrate BetterSeo into your workflow with our powerful REST API and webhooks.',
    },
    {
      title: 'Automated Reports',
      description:
        'Receive weekly or monthly reports automatically delivered to your inbox with key insights.',
    },
    {
      title: 'Competitor Analysis',
      description:
        "Track your competitors' rankings and identify opportunities to improve your SEO strategy.",
    },
    {
      title: 'Site Audits',
      description:
        'Automatically scan your website for SEO issues and get actionable recommendations.',
    },
  ];

  return (
    <section id="features">
      <div className="max-w-4xl mx-auto border-x border-b border-dotted">
        <div className="py-12 px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="md:text-3xl text-xl font-medium text-foreground">
              Everything you need to <span className="text-brand">succeed with SEO</span>
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Powerful tools and features designed to help you optimize your search engine rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {features.map((feature, index) => (
              <div key={index} className="p-6 space-y-2 hover:bg-secondary">
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
