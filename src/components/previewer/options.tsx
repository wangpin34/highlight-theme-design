import { GearIcon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Container, Flex, IconButton, Popover, Select, Separator, Tabs, Text, TextArea } from '@radix-ui/themes'

export default function Options() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton>
          <GearIcon width="18" height="18" />
        </IconButton>
      </Popover.Trigger>

      <Popover.Content style={{ width: 360 }}>
        <Tabs.Root defaultValue="theme">
          <Tabs.List>
            <Tabs.Trigger value="theme">Theme</Tabs.Trigger>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          </Tabs.List>

          <Container>
            <Tabs.Content value="theme">
              <Box py="4">
                <Flex align="center" gap="2">
                  <Text size="2">Dark/Light</Text>
                  <Select.Root value="light">
                    <Select.Trigger placeholder="Select Dark/Light" />
                    <Select.Content>
                      <Select.Item value="dark">Dark</Select.Item>
                      <Select.Item value="light">Light</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Box>
            </Tabs.Content>
            <Tabs.Content value="preview">
              <Box py="4">
                <Flex align="center" gap="1">
                  <Text size="2" weight="light">
                    Font size
                  </Text>
                  <IconButton size="1" variant="soft">
                    <MinusIcon height="12" width="12" />
                  </IconButton>
                  <Text size="2">10</Text>
                  <IconButton size="1" variant="soft">
                    <PlusIcon height="12" width="12" />
                  </IconButton>
                </Flex>
                <Separator my="4" orientation="horizontal" size="4" />
                <Flex direction="column" gap="2">
                  <Text size="2" weight="light">
                    Code to be highlighted
                  </Text>
                  <TextArea placeholder="Input the code here" />
                </Flex>
              </Box>
            </Tabs.Content>
          </Container>
        </Tabs.Root>
      </Popover.Content>
    </Popover.Root>
  )
}
