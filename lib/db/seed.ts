import { db } from './index';
import { badges } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed predefined badges
  await db.insert(badges).values([
    {
      name: 'First Steps',
      description: 'Complete your first lesson',
      criteriaType: 'lessons_completed',
      criteriaValue: 1,
      tier: 'bronze',
    },
    {
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      criteriaType: 'streak_count',
      criteriaValue: 7,
      tier: 'silver',
    },
    {
      name: 'XP Master',
      description: 'Earn 1000 XP',
      criteriaType: 'xp_milestone',
      criteriaValue: 1000,
      tier: 'gold',
    },
    {
      name: 'Course Champion',
      description: 'Complete 5 courses',
      criteriaType: 'courses_completed',
      criteriaValue: 5,
      tier: 'gold',
    },
    {
      name: 'Perfect Score',
      description: 'Get 100% on a quiz',
      criteriaType: 'quiz_perfect_score',
      criteriaValue: 100,
      tier: 'platinum',
    },
  ]);

  console.log('✅ Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});