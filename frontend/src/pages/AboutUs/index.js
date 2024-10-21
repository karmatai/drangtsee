import React from 'react';
import { Box, Typography, Paper, Button, Stack, Grid } from '@mui/material';

const AboutUsPage = () => {
  const roles = [
    {
      title: "👑 Queen Bee (Admin)",
      description:
        "Full control over the website, managing all contributors, approving/rejecting contributions, and overseeing the overall content and user management.",
    },
    {
      title: "🐝 Worker Bee (Editor)",
      description:
        "Responsible for editing lyrics, submitting corrections, and approving submissions from lower-level contributors, with some limited admin capabilities.",
    },
    {
      title: "🕵️ Scout Bee (Researcher)",
      description:
        "Finds new songs and artists or updates existing content, suggesting new entries that require approval from higher-level contributors.",
    },
    {
      title: "🍯 Honey Bee (Contributor)",
      description:
        "Basic contributor role responsible for submitting new lyrics and minor updates. This role also includes translators who help with accuracy.",
    },
    {
      title: "🛡️ Guard Bee (Moderator)",
      description:
        "Manages user contributions to maintain clean and appropriate content. Has authority to remove inappropriate contributions or ban users for misconduct. This role includes spelling checkers to ensure quality.",
    },
    {
      title: "🐝 Drone Bee (Reviewer)",
      description:
        "Reviews suggestions, comments on content quality, and provides feedback to help maintain the overall quality of the content.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 3,
        top:0
      }}
    >
      {/* Page Header */}
      <Typography variant="h4" gutterBottom>
        ང་ཚོའི་སྐོར།
      </Typography>
  
      {/* Welcome Section */}
      <Typography variant="body1" paragraph>
        སྦྲང་ཚང་ནི་ཁ་བ་རི་པའི་རིག་གཞུང་མི་ཉམས་རྒྱུན་འཛིན་བྱེད་རྒྱུའི་སྒར་སྟེགས་ཞིག་ཡིན།
      </Typography>
  
      {/* Vision Section */}
      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        ང་ཚོའི་དམིགས་ཡུལ།
      </Typography>
      <Typography variant="body1" paragraph>
        སྦྲང་ཚང་དུ་ཁ་བ་རི་པའི་གླུ་གཞས་རྣམས་ཀྱི་ཡིག་མཛོད་ཆ་ཚང་བ་ཞིག་བསྐྲུན་རྒྱུ་ཡིན།
      </Typography>
  
      {/* Contributor Roles */}
      {/* 
      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
      </Typography>
  
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {roles.slice(0, 3).map((role, index) => (
          <Paper key={index} elevation={3} sx={{ padding: 2, textAlign: 'left', flex: 1, maxWidth: "30%" }}>
            <Typography variant="h6">{role.title}</Typography>
            <Typography variant="body2">{role.description}</Typography>
          </Paper>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {roles.slice(3, 6).map((role, index) => (
          <Paper key={index} elevation={3} sx={{ padding: 2, textAlign: 'left', flex: 1 }}>
            <Typography variant="h6">{role.title}</Typography>
            <Typography variant="body2">{role.description}</Typography>
          </Paper>
        ))}
      </Stack>
      */}
  
      {/* Call to Join */}
      {/*
      <Typography variant="body1" paragraph>
        Together, we are dedicated to celebrating Tibetan culture through music and lyrics. Join us in this journey!
      </Typography>
  
      {/* Donation Section */}{/*
      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        Donate Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you believe in our mission and would like to support our efforts, we welcome any donations. Your contributions will help us maintain the website, expand our collection, and promote Tibetan music globally.
      </Typography>
  
      {/* Donation Button */}{/*
      <Button
        variant="contained"
        color="primary"
        href="https://your-donation-link.com"
        target="_blank"
        sx={{ mt: 2 }}
      >
        Donate Now
      </Button>
      */}
    </Box>
  );
}  

export default AboutUsPage;