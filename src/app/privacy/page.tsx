import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <p>
              Your privacy is important to us. It is our policy to respect your
              privacy regarding any information we may collect from you across our
              website.
            </p>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-primary/90">1. Information we collect</h2>
              <p>
                We only ask for personal information when we truly need it to
                provide a service to you. We collect it by fair and lawful means,
                with your knowledge and consent. We also let you know why we’re
                collecting it and how it will be used.
              </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-primary/90">2. How we use your information</h2>
                <p>
                    We only retain collected information for as long as necessary to
                    provide you with your requested service. What data we store, we’ll
                    protect within commercially acceptable means to prevent loss and
                    theft, as well as unauthorized access, disclosure, copying, use or
                    modification.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-primary/90">3. Sharing and Disclosure</h2>
                <p>
                    We don’t share any personally identifying information publicly or
                    with third-parties, except when required to by law.
                </p>
            </div>

            <p>
              Our website may link to external sites that are not operated by us.
              Please be aware that we have no control over the content and
              practices of these sites, and cannot accept responsibility or
              liability for their respective privacy policies.
            </p>
            <p>
              You are free to refuse our request for your personal information,
              with the understanding that we may be unable to provide you with
              some of your desired services.
            </p>
            <p>
              Your continued use of our website will be regarded as acceptance of
              our practices around privacy and personal information. If you have
              any questions about how we handle user data and personal
              information, feel free to contact us.
            </p>
            <p className="text-sm text-muted-foreground pt-4">This policy is effective as of today's date.</p>
            <p className="text-sm font-semibold text-destructive">
                Disclaimer: This is a template privacy policy. You should consult with a legal professional to ensure it meets the specific needs and legal requirements of your application.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
