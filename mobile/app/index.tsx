import { Redirect } from 'expo-router';

export default function Index() {
  // In a real app, we would check for auth token or "hasSeenOnboarding" here.
  // For now, force the onboarding flow.
  return <Redirect href="/onboarding" />;
}
