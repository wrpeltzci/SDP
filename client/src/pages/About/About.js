import React from 'react';
import {
  Avatar,
  IconButton,
  Typography
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import CoreCard from '../../components/_core/CoreCard';
import CoreGridContainer from '../../components/_core/CoreGridContainer';
import CoreGridItem from '../../components/_core/CoreGridItem';

const cardData = [
  {
    title: 'Main Title',
    subheader: 'Sub title',
    size: 3,
    avatar: 'W',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    title: 'Main Title2',
    subheader: 'Sub title2',
    size: 3,
    avatar: 'S',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    title: 'Main Title3',
    subheader: 'Sub title3',
    size: 3,
    avatar: 'J',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    title: 'Main Title',
    subheader: 'Sub title',
    size: 3,
    avatar: 'U',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    title: 'Main Title2',
    subheader: 'Sub title2',
    size: 6,
    avatar: 'W',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    title: 'Main Title3',
    subheader: 'Sub title3',
    size: 12,
    avatar: 'W',
    body: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
]

const About = () => {
  return (
    <FullWidthLayout title="About">
      <CoreGridContainer>
        {
          cardData.map((item, key) =>
            <CoreGridItem md={item.size} key={key}>
              <CoreCard
                title={item.title}
                subheader={item.subtitle}
                avatar={
                  <Avatar>{item.avatar}</Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }

              >
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </CoreCard>
            </CoreGridItem>
          )
        }
      </CoreGridContainer>
    </FullWidthLayout>
  )
};

export default About;