import { CaretDownIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, DropdownMenu, Flex, Text, TextField } from '@radix-ui/themes'
export default function Header() {
  return (
    <>
      <header className="bg-slate-200">
        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                Code
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>New</DropdownMenu.Item>
              <DropdownMenu.Item>Use snippets</DropdownMenu.Item>
              <DropdownMenu.Separator />

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Load code from</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>From local</DropdownMenu.Item>
                  <DropdownMenu.Item>From cache</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>From remote</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                Options
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Highlight(dark/light)</DropdownMenu.Item>
              <DropdownMenu.Item>Preview</DropdownMenu.Item>
              <DropdownMenu.Separator />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button variant="soft">Export</Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                About
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Version</DropdownMenu.Item>
              <DropdownMenu.Item>Author</DropdownMenu.Item>
              <DropdownMenu.Item>Why this project?</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </header>

      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Edit profile</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input defaultValue="Freja Johnsen" placeholder="Enter your full name" />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input defaultValue="freja@example.com" placeholder="Enter your email" />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
